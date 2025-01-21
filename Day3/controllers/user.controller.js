import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import CryptoJS from 'crypto-js';
import sendAppMail from './mail.service.js';

class UserController {
  static async register(req, res) {
    try {
      const { name, email, password, verifyPassword, phone, gender } = req.body;

      if (!name) return res.status(422).json({ error: 'Name is required' });
      if (!email) return res.status(422).json({ error: 'Email is required' });
      if (!password || !verifyPassword)
        return res.status(422).json({ error: 'Passwords are required' });
      if (!phone) return res.status(422).json({ error: 'Phone is required' });
      if (password !== verifyPassword)
        return res.status(422).json({ error: 'Passwords do not match' });

      if (await User.findOne({ email }))
        return res.status(422).json({ error: 'Email is used' });

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
        email,
        password: hashedPassword,
        phone: encryptedPhone,
        gender,
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
      //TODO Add jwt later
      const { email, password } = req.body;
      if (!email) return res.status(422).json({ error: 'Email is required' });
      if (!password)
        return res.status(422).json({ error: 'Password is required' });

      const user = await User.findOne({ email });
      if (!user) return res.status(404).json({ error: 'User not found' });

      if (!bcrypt.compareSync(password, user.password))
        return res.status(401).json({ error: 'Invalid password' });

      const userObj = user.toObject();
      userObj.phone = CryptoJS.AES.decrypt(
        userObj.phone,
        process.env.SECRET_KEY
      ).toString(CryptoJS.enc.Utf8);
      delete userObj.password;

      res.status(200).json(userObj);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

export default UserController;
