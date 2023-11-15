import db from "../models";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const salt = bcrypt.genSaltSync(8);
const hashPassword = (password) => bcrypt.hashSync(password, salt);

export const register = ({ email, password }) =>
  new Promise(async (resolve, reject) => {
    try {
      // findOrCreate trả về kiểu mảng
      const response = await db.User.findOrCreate({
        where: { email },
        defaults: {
          email,
          password: hashPassword(password),
        },
      });
      // get token
      const token = response[1]
        ? jwt.sign(
            {
              id: response[1].id,
              email: response[1].email,
              role_code: response[1].id,
            },
            process.env.JWT_SECRET,
            { expiresIn: "5d" }
          )
        : null;
      resolve({
        error: response[1] ? 0 : 1, // nếu đúng là trả về 0 / 1
        message: response[1]
          ? "Đăng ký thành công"
          : "Email hoặc mật khẩu tồn tại",
        accessToken: token,
      });
    } catch (error) {
      reject(error);
    }
  });

// login
export const login = ({ email, password }) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.User.findOne({
        where: { email },
        raw: true,
      });
      const isChecked =
        response && bcrypt.compareSync(password, response.password);
      const token = isChecked
        ? jwt.sign(
            {
              id: response.id,
              email: response.email,
              role_code: response.role_code,
            },
            process.env.JWT_SECRET,
            { expiresIn: "5d" }
          )
        : null;
      resolve({
        error: token ? 0 : 1,
        message: token
          ? "Đăng nhập thành công"
          : response
          ? "Email hoặc mật khẩu không đúng"
          : "Email chưa đăng ký",
        accessToken: token,
      });
    } catch (error) {
      reject(error);
    }
  });
