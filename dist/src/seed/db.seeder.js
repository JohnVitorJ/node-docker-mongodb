"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const orders_model_1 = require("../orders/orders.model");
const users_model_1 = require("../users/users.model");
const faker_1 = __importDefault(require("faker"));
function seedDB(times) {
    return __awaiter(this, void 0, void 0, function* () {
        faker_1.default.locale = "pt_BR";
        yield users_model_1.UserModel.deleteMany({});
        const usersDoc = Array(times)
            .fill(null)
            .map(() => {
            const name = faker_1.default.name.findName();
            return new users_model_1.UserModel({
                name,
                email: faker_1.default.internet.email(name),
                startedAt: faker_1.default.date.past(10, 2005),
                birth: faker_1.default.date.past(15, 2000),
            });
        });
        const users = yield Promise.all(usersDoc.map((userDoc) => userDoc.save()));
        yield orders_model_1.OrdersModel.deleteMany({});
        const types = ["Internet", "Streaming", "Market", "Spotify", "Energy"];
        const titlesDoc = Array(times)
            .fill(null)
            .map(() => {
            return new orders_model_1.OrdersModel({
                user: users[faker_1.default.datatype.number({ min: 0, max: times - 1 })]._id,
                type: types[faker_1.default.datatype.number({ min: 0, max: 4 })],
                dueDate: faker_1.default.date.between("2020-05-01", "2022-05-1"),
                amount: faker_1.default.finance.amount(100, 1000, 2),
            });
        });
        yield Promise.all(titlesDoc.map((titleDoc) => titleDoc.save()));
        return true;
    });
}
exports.default = seedDB;
//# sourceMappingURL=db.seeder.js.map