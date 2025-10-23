import User from "../models/Usermodel.js";
import { error, success } from "../utils/Response.js";


import {unlink} from "fs/promises";
import validator from "validator";

import bcryptjs from "bcryptjs";

import gettoken from "../utils/Jwt.js";

import transporter from "../config/Nodemailer.js";
import cloudinary from "../config/Clodinary.js";

const register = async (req, res) => {
  const { fullname, username, email, password, } =
    req.body;
  if (!fullname || !username || !email || !password) {
    return error(res, "Pls provoide all credentials");
  }

  try {
    const profilepic =
      "https://cdn.dribbble.com/userupload/20005517/file/original-95b85fb8ef26dc0f0e8281c78a87eff5.png?format=webp&resize=640x480&vertical=center";
    const coverpic =
      "https://plus.unsplash.com/premium_photo-1760645955553-d0b4d56ecbf6?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8&auto=format&fit=crop&q=60&w=900";
    const user = await User.findOne({ email });
    if (user) {
      return error(res, "User already exist");
    }
    if(user?.username === username){

      return error(res,"Provide another username")
    }
    if (!validator.isEmail(email)) {
      return error(res, "Pls provide valid email");
    }
    if (!validator.isStrongPassword(password)) {
      return error(res, "pls provide strong password");
    }

    let profileurl;
    let coverurl;

    if (profilepic) {
      const url = await cloudinary.uploader.upload(profilepic, {
        folder: "uploads",
      })
      profileurl=url.secure_url
      
    }
    if (coverpic) {
      const url = await cloudinary.uploader.upload(coverpic, {
        folder: "uploads",
      })
      coverurl = url.secure_url
    }

    const hashpassword = await bcryptjs.hash(password, 10);
    const newuser = await User.create({
      fullname,
      username,
      email,
      password: hashpassword,
      profilepic: profileurl ? profileurl : profilepic,
      coverpic: coverurl ? coverurl : coverpic,
    });

    if (newuser) {
      const mailoption = {
        from: process.env.SENDER_EMAIL,
        to: newuser.email,
        subject: "Welcome to Blog  app",
        text: `Welcome to Blog app.Your account has been created with email Id:${newuser.email}`,
      };
      await transporter.sendMail(mailoption);
      const token = gettoken(newuser._id);



res.cookie('token',token, {
    httpOnly: true,
    secure: true,        // Ensure your app is served over HTTPS in production
    sameSite: 'none',    // Required for cross-site cookie sharing
    maxAge: 7*24*60*60*1000      // Optional: cookie expiration time in milliseconds
  });
      

      return success(res, "Account created", token);
    } else {
      return error(res, "Something went wrong.");
    }
  } catch (err) {
    error(res, err.message);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return error(res, "Pls provide email and password");
    }

    const user = await User.findOne({ email:email });

    if (!user) {
      return error(res, "User not found");
    }
    const checkpass = await bcryptjs.compare(password, user.password);
    if (!checkpass) return error(res, "Pass doesnt match");
    const token = gettoken(user._id);



    res.cookie('token', token, {
    httpOnly: true,
    secure: true,        // Ensure your app is served over HTTPS in production
    sameSite: 'none',    // Required for cross-site cookie sharing
    maxAge: 7*24*60*60*1000      // Optional: cookie expiration time in milliseconds
  });

    return success(res, "Login successfull", token);
  } catch (err) {
    return error(res, err.message);
  }
};

const logout = async (_, res) => {
  try {
    res.clearCookie("token");
    return success(res, "Logout successfull");
  } catch (err) {
    return error(res, err.message);
  }
};

const getuser = async (req, res) => {
  const { _id } = req.user;
  try {

    const user = await User.findOne({ _id }).select("-password");
    if (!user) {
      return error(res, "User not found");
    }
    return success(res, "User found", user);
  } catch (err) {
    return error(res, err.message);
  }
};

const sendverifyotp = async (req, res) => {
  const { _id } = req.user;
  try {
    const user = await User.findOne({ _id });
    if (!user) {
      return error(res, "Login first");
    }
    if (user.isverified) {
      return error(res, "Already verified");
    }
    const otp = String(Math.floor(100000 + Math.random() * 900000));
    user.verifyotp = otp;
    user.verifyotpexp = Date.now() + 24 * 60 * 60 * 1000;
    await user.save();

    const mailoption = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Verification OTP ",
      text: `Your verification otp is ${otp}. `,
    };

    await transporter.sendMail(mailoption);

    return success(res, "Verification OTP send ");
  } catch (err) {
    return error(res, err.message);
  }
};

const checkverifyotp = async (req, res) => {
  const { _id } = req.user;
  let { otp } = req.body;
  otp=String(otp)
  try {
    if (!otp) {
      return error(res, "Provide Otp");
    }
    const user = await User.findOne({ _id });
    if (!user) {
      return error(res, "Login first");
    }
    if (user.verifyotpexp < Date.now()) {
      return error(res, "OTP expired");
    }
    if (user.verifyotp === "" || user.verifyotp !== otp) {
      return error(res, "Invalid otp");
    }

    user.isverified = true;
    user.verifyotp = "";
    user.verifyotpexp = 0;
    await user.save();
    const mailoption = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Account Verified ",
      text: `Your account has been successfully verified. `,
    };

    await transporter.sendMail(mailoption);
    return success(res, "Account verified succesfully.");
  } catch (err) {
    return error(res, err.message);
  }
};

const sendresetotp = async (req, res) => {
  const { email } = req.body;
  try {
    if (!email) {
      return error(res, "Email is required");
    }

    let user = await User.findOne({ email });
    if (!user) {
      return error(res, "User doesn't exist.");
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000));
    user.resetotp = otp;
    user.resetotpexp = Date.now() + 3 * 60 * 1000;
    await user.save();

    const mailoption = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: " OTP for reset password ",
      text: `Your  otp for reseeting password  is ${otp}. `,
    };
    
    console.log('Attempting to send OTP email to:', user.email);
    await transporter.sendMail(mailoption);
    console.log('OTP email sent successfully to:', user.email);
    
    return success(res, "Reset OTP sent successfully");
  } catch (err) {
    console.error('Error sending reset OTP:', err);
    return error(res, err.message);
  }
};

const checkresetotp = async (req, res) => {
  let { email, otp } = req.body;
  otp=String(otp)
  
  try {
    if (!email) {
      return error(res, "provide email");
    }
    if (!otp) {
      return error(res, "provide OTP");
    }
    const user = await User.findOne({ email });
    if (!user) {
      return error(res, "User not found with that email");
    }
    if (user.resetotp == "" || user.resetotp !== otp) {
      return error(res, "Invalid Otp");
    }
    if (user.resetotpexp < Date.now()) {
      return error(res, "Otp expired ");
    }

    user.resetotp = "";
    user.resetotpexp = 0;
    await user.save();
    return success(res, "Successfull");
  } catch (err) {
    return error(res, err.message);
  }
};

const updateprofile = async (req, res) => {
  const { _id } = req.user;
  const { fullname, password, bio } = req.body;
  let cover;
  let profile;

  const profilepic = req.files?.profilepic && req.files.profilepic[0];
  const coverpic = req.files?.coverpic && req.files.coverpic[0];
  try {
    let user = await User.findOne({ _id });
    if (!user) {
      return error(res, "User not found");
    }

    if (profilepic !== undefined) {
      profile = await cloudinary.uploader.upload(profilepic.path, {
        resource_type: "image",
      });
      if (!profile.secure_url) {
        throw new Error("Failed to upload image to cloudinary");
      }
      await unlink(profilepic.path)
      user.profilepic = profile.secure_url;

    }

    if (coverpic !== undefined) {
      cover = await cloudinary.uploader.upload(coverpic.path, {
        resource_type: "image",
      });
      if (!cover.secure_url) {
        throw new Error("Failed to upload image to cloudinary");
      }
await unlink(coverpic.path)
      user.coverpic = cover.secure_url;

    }

    if (fullname) {
      user.fullname = fullname;
    }

    if (password) {
      user.password = await bcryptjs.hash(password, 10);
    }

    if (bio) {
      user.bio = bio;
    }

    await user.save();
    return success(res, "Profile updated");
  } catch (err) {
    return error(res, err.message);
  }
};

export {
  register,
  login,
  logout,
  getuser,
  sendverifyotp,
  checkverifyotp,
  sendresetotp,
  checkresetotp,
  updateprofile,
};
