import bcrypt from 'bcrypt';
import CryptoJS from 'crypto-js';
import jwt from 'jsonwebtoken';
import path from 'path';
import fs from 'fs';
import User from '../models/user.model.js';
import sendAppMail from '../utilities/mail.service.js';

class UserController {
  static async register(req, res) {
    try {
      const { name, email, password, phone, gender } = req.body;
      let avatar = null;

      if (await User.findOne({ email: email.toLowerCase() }))
        return res.status(422).json({ error: 'Email is used' });

      if (req.file) {
        const uploadName = `${Date.now()}-${req.file.originalname}`;
        const uploadPath = path.join('uploads', uploadName);
        avatar = uploadName;
        fs.writeFileSync(uploadPath, req.file.buffer, (err) => {
          if (err) {
            res.status(500).json({ error: 'Failed to save file' });
          }
        });
      }

      const hashedPassword = bcrypt.hashSync(
        password,
        parseInt(process.env.SALT_NUM)
      );

      const encryptedPhone = CryptoJS.AES.encrypt(
        phone,
        process.env.SECRET_KEY
      ).toString();

      sendAppMail(
        email,
        'Verify your email',
        'Hello, this is a verification email.'
      );

      const user = await User.create({
        name,
        email: email.toLowerCase(),
        password: hashedPassword,
        phone: encryptedPhone,
        gender,
        avatar,
      });

      const userObj = user.toObject();
      delete userObj.password;

      res.status(201).json(userObj);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email: email.toLowerCase() });
      if (!user) return res.status(404).json({ error: 'User not found' });

      if (!bcrypt.compareSync(password, user.password))
        return res.status(401).json({ error: 'Invalid password' });

      const userObj = user.toObject();
      userObj.phone = CryptoJS.AES.decrypt(
        userObj.phone,
        process.env.SECRET_KEY
      ).toString(CryptoJS.enc.Utf8);
      delete userObj.password;

      userObj.token = jwt.sign({ id: userObj._id }, process.env.JWT_SECRET, {
        expiresIn: '1d',
      });

      res.status(200).json(userObj);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

export default UserController;
