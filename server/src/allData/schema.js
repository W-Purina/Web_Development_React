import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { ObjectId } from 'mongoose';


// 从mongoose库中导入Schema库
const Schema = mongoose.Schema;

// 创建User Schema
const passwordCheck = (value) => {
    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumber = /\d/.test(value);

    return hasLowerCase && hasUpperCase && hasNumber;
}

const userSchema = new Schema({
    username: { type: String, unique: true, required: true, }, 

    // 输入的密码必须有数字还有大小写字母
    password:{ type: String, required: true, minlength: 6, maxlength: 100, 
        validate: {validator: passwordCheck, 
            message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number.',
        },
    },

    // Email可能在后面用于验证登录所以我直接设置的就是unique
    email: {type: String, unique: true, required: true},
    firstName: { type: String, maxlength: 30, required: true}, 
    lastName: { type: String, maxlength: 30, required: true},
    isActive: { type: Boolean, default: true, },
    groups: [{ type: Schema.Types.ObjectId, ref: 'Group'}, ],
    dateOfBirth: Date,
    phonenumber: String,
    sex: String
},{
    timestamps:{}
});

// 使用 pre-save 中间件在保存用户之前自动对密码进行哈希处理
userSchema.pre('save', async function (next) {
    // 检验用户是否修改了password信息，如果未处理就直接跳过后面的hash处理
    if (!this.isModified('password')) {
        return next();
    }
    
    try {
        // salt的因数影响破解难度
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        // 替换掉用户之前用的明文密码，取而代之的是经过hash处理的密码
        this.password = hashedPassword;
        next();
    } catch (error) {
        // 这将导致错误被传递给 Mongoose 的错误处理机制。这意味着保存操作将失败，您可以捕获并处理该错误。
        next(error);
    }
});
    

// 添加一个实例方法用于验证密码
userSchema.methods.verifyPassword = async function (password) {
    // 使用bcrypt中的compare方法进行验证
    return await bcrypt.compare(password, this.password);
};

export const User = mongoose.model('User', userSchema);

// 创建Group Schema

const groupSchema = new Schema({
    groupname: { type: String, required: true, unique: true, maxlength:100, },
    description: { type: String, maxlength: 500, },
    members: [{ type: Schema.Types.ObjectId, ref: 'User'}, ],
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' , required: true, },
    isActive: { type: Boolean, default: true, },
    orders: [{ type: Schema.Types.ObjectId, ref: 'Order'}, ],
    // 上面是我创建的维护信息

    
}, {
    timestamps: {}
});

export const Group = mongoose.model('Group', groupSchema);

// 创建Order Schema

const validateItemPrice = (items) => {
    return items.every(item => item.unitprice != null || item.productprice != null);
};

const orderSchema = new Schema({
    storename: {type: String, require: true,},
    group: { type: Schema.Types.ObjectId, ref: 'Group', required: true },
    // 创建一个createBy属性，用来记录创建者的信息，是一个必要信息
    createdBy: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    items: [
        {
            productname: {type: String, require: true },
            unitprice: {type: Number, min: 0, },
            amount: { type: Number, required: true, default: 1, min: 1, },
            productprice: { type: Number, min: 0},
        },
    ],
    purchaseDate: { type: Date, required: true, default:Date.now, },
    totalPrice: { type: Number, min:0, },

}, {
    timestamps: {}
});

// 验证器自动执行，不用手动处理
// 验证最少应该输入一个价格,要么输入一个单价,要么输入一个总价

// 使用上面的验证函数来测试是否符合条件，如果不符合条件就抛出错误
orderSchema.path('items').validate(validateItemPrice, 'At least unitPrice or totalPrice needs to be provided for each item');
    
// 计算总金额的时候，判断有没有总价，如果没有总价就用单价乘以数量，如果有总价就用总价直接加
orderSchema.pre('save', function (next) {
    // item是便利items.reduce项目中所有的item在这里就是商品单中的商品。
    this.totalPrice = this.items.reduce((accumulator, item) => {
        // 如果项目有总价，则使用总价，否则使用单价乘以数量
        const itemPrice = item.productprice != null ? item.productprice : item.unitprice * item.quantity;
        return accumulator + itemPrice;
    }, 0);
    next();
});

export const Order = mongoose.model('Order', orderSchema);
