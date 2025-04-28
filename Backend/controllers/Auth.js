// import fs from 'fs';
// import jwt from 'jsonwebtoken'

// import { FileUploadeToColoudinary } from '../libs/Cloudinary.js';
// import UserModal from '../models/User.js';
// import bcrypt from 'bcryptjs'

// const Register = async (req, res) => {
//     try {
//         const {FullName,email,password}=req.body
//         // Upload the image to Cloudinary
//         // const imagePath = req.file.filename;
//         const filename = req.file ? req.file.filename : null;

//         // const cloudinaryResult = await FileUploadeToColoudinary(imagePath, 'user_profiles');
//           console.log(imagePath)
//         // Create a new user with the uploaded image URL
//         const existUser= await UserModal.findOne({email})
//         if (existUser) {
//             return res.status(301).json({success:false,message:"User Already Exist Please Login"})
//         }
//         const hasePassword= await bcrypt.hashSync(password,10)
//         const newUser = new UserModal({
//             FullName: FullName,
//             email: email,
//             password: hasePassword,
//             profile: imagePath,
//         });

//         // Save the user to the database
//         await newUser.save();

//         // // Remove the image from the local directory after uploading to Cloudinary
//         // fs.unlinkSync(imagePath);

//         res.status(201).json({success:true, message: 'User registered successfully',user:newUser});
//     } catch (error) {
//         console.error('Error during registration', error);
//         res.status(500).json({ error: 'Error during registration' });
//     }
// }



// const Login = async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         console.log(email, password);
//         if (!email || !password) {
//             return res.status(400).json({ success: false, message: "All fields are required" });
//         }
//         const FindUser = await UserModal.findOne({ email });
//         if (!FindUser) {
//             return res.status(404).json({ success: false, message: "Account not found. Please register." });
//         }
//         const comparePassword = await bcrypt.compare(password, FindUser.password);
//         if (!comparePassword) {
//             return res.status(401).json({ success: false, message: "Invalid password" });
//         }

//         const token = jwt.sign({ userId: FindUser._id }, process.env.JWT_SECRET);
//         res.cookie('token', token, {
//             httpOnly: true,
//             secure: false,
//             maxAge: 3 * 24 * 60 * 60 * 1000 // 3 days in milliseconds
//         });
        
//         return res.status(200).json({ success: true, message: "Login successfully", user: FindUser, token });
//     } catch (error) {
//         console.error('Error during login', error);
//         res.status(500).json({ success: false, message: 'Internal server error' });
//     }
// };

// const Logout=async(req,res)=>{
//     try {
//         // Clear the token cookie
//         res.clearCookie('token');

//         // Return success message
//         res.status(200).json({ message: "Logout successful" });
//     } catch (error) {
//         // Handle error
//         console.error("Error logging out:", error);
//         res.status(500).json({ message: "Internal Server Error" });
//     }
// }

// const updateProfile = async (req, res) => {
//     try {
//         const userId = req.params.id;
//         const { FullName, oldpassword, newpassword } = req.body;

//         // Find the user by ID
//         const ExistUser = await UserModal.findById(userId);
//         if (!ExistUser) {
//             return res.status(404).json({ success: false, message: "Account not found." });
//         }

//         // Check if old password and new password are provided and validate old password
//         if (oldpassword) {
//             const comparePassword = await bcrypt.compare(oldpassword, ExistUser.password);
//             if (!comparePassword) {
//                 return res.status(401).json({ success: false, message: "Old password is incorrect." });
//             }
//         }

//         // Update FullName if provided
//         if (FullName) {
//             ExistUser.FullName = FullName;
//         }

//         // Update password if old and new passwords are provided and valid
//         if (oldpassword && newpassword) {
//             const hashedPassword = await bcrypt.hash(newpassword, 10);
//             ExistUser.password = hashedPassword;
//         } else if (oldpassword && !newpassword) {
//             return res.status(400).json({ success: false, message: "New password is required when old password is provided." });
//         }

        

    
//         await ExistUser.save();

//         // Return success response
//         res.status(200).json({ success: true, message: "Profile updated successfully.", user: ExistUser });

//     } catch (error) {
//         console.error("Error updating profile:", error);
//         res.status(500).json({ success: false, message: "Internal Server Error" });
//     }
// };

// export {Register,Login,Logout,updateProfile}


import fs from 'fs';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { FileUploadeToColoudinary } from '../libs/Cloudinary.js';
import UserModal from '../models/User.js';

// ==================== Register =====================
const Register = async (req, res) => {
    try {
        const { FullName, email, password } = req.body;

        // Check if user already exists
        const existUser = await UserModal.findOne({ email });
        if (existUser) {
            return res.status(301).json({ success: false, message: "User already exists. Please login." });
        }

        // Handle file upload
        let profileUrl = null;
        if (req.file) {
            const localPath = req.file.path; // if using diskStorage multer
            console.log('Uploaded file path:', localPath);

            // OPTIONAL: Upload to Cloudinary
            // const uploadResult = await FileUploadeToColoudinary(localPath, 'user_profiles');
            // profileUrl = uploadResult.secure_url;

            // If you are not using Cloudinary, you can save the local filename
            profileUrl = req.file.filename;

            // OPTIONAL: remove local file after upload to cloud
            // fs.unlinkSync(localPath);
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new UserModal({
            FullName,
            email,
            password: hashedPassword,
            profile: profileUrl,
        });

        await newUser.save();

        res.status(201).json({ success: true, message: "User registered successfully", user: newUser });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// ==================== Login =====================
const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required." });
        }

        const FindUser = await UserModal.findOne({ email });
        if (!FindUser) {
            return res.status(404).json({ success: false, message: "Account not found. Please register." });
        }

        const isPasswordMatch = await bcrypt.compare(password, FindUser.password);
        if (!isPasswordMatch) {
            return res.status(401).json({ success: false, message: "Invalid password." });
        }

        const token = jwt.sign({ userId: FindUser._id }, process.env.JWT_SECRET, { expiresIn: '3d' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: false, // set to true in production with https
            maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days
        });

        res.status(200).json({ success: true, message: "Login successful", user: FindUser, token });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// ==================== Logout =====================
const Logout = async (req, res) => {
    try {
        res.clearCookie('token');
        res.status(200).json({ success: true, message: "Logout successful" });
    } catch (error) {
        console.error("Error logging out:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

// ==================== Update Profile =====================
const updateProfile = async (req, res) => {
    try {
        const userId = req.params.id;
        const { FullName, oldpassword, newpassword } = req.body;

        const user = await UserModal.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "Account not found." });
        }

        // Update FullName if provided
        if (FullName) {
            user.FullName = FullName;
        }

        // Update password if old and new provided
        if (oldpassword && newpassword) {
            const isMatch = await bcrypt.compare(oldpassword, user.password);
            if (!isMatch) {
                return res.status(401).json({ success: false, message: "Old password is incorrect." });
            }
            const hashedNewPassword = await bcrypt.hash(newpassword, 10);
            user.password = hashedNewPassword;
        } else if (oldpassword && !newpassword) {
            return res.status(400).json({ success: false, message: "New password is required if old password is provided." });
        }

        await user.save();

        res.status(200).json({ success: true, message: "Profile updated successfully", user });
    } catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

// ==================== Export =====================
export { Register, Login, Logout, updateProfile };
