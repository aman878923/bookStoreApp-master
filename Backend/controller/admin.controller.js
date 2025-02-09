import AdminUser from '../models/adminUser.model.js';
import { transporter } from '../config/nodemailer.js';

export const registerAdmin = async (req, res) => {
  try {
    const { fullname, email, password, role, permissions } = req.body;

    if (!fullname || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    const existingAdmin = await AdminUser.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        message: "Admin with this email already exists"
      });
    }

    const newAdmin = new AdminUser({
      fullname,
      email,
      password,
      role: role || 'admin',
      permissions: permissions || ['manage_books', 'view_analytics']
    });

    await newAdmin.save();

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Welcome to BookStore Admin Panel",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(to right, #ec4899, #8b5cf6); padding: 2px; border-radius: 10px;">
            <div style="background: white; padding: 20px; border-radius: 8px;">
              <h1 style="color: #ec4899; text-align: center; font-size: 24px; margin: 0 0 20px 0;">Welcome to BookStore Admin Panel</h1>
              
              <p style="color: #374151; margin: 5px 0;">Hello ${fullname},</p>
              <p style="color: #374151; margin: 15px 0;">Your admin account has been created successfully with the following details:</p>
              
              <div style="background-color: #f3f4f6; padding: 15px; border-radius: 5px; margin: 20px 0;">
                <p style="margin: 5px 0;"><strong>Role:</strong> ${role || 'admin'}</p>
                <p style="margin: 5px 0;"><strong>Email:</strong> ${email}</p>
                <p style="margin: 5px 0;"><strong>Permissions:</strong> ${permissions?.join(', ') || 'Standard admin access'}</p>
              </div>

              <p style="color: #374151;">You can now access the admin dashboard to manage the bookstore platform.</p>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="${process.env.ADMIN_DASHBOARD_URL}" 
                   style="background-color: #ec4899; 
                          color: white; 
                          padding: 12px 24px; 
                          text-decoration: none; 
                          border-radius: 5px; 
                          display: inline-block;">
                  Access Dashboard
                </a>
              </div>

              <p style="color: #6b7280; font-size: 0.875rem;">For security reasons, please change your password upon first login.</p>
            </div>
          </div>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({
      success: true,
      message: "Admin registered successfully",
      admin: {
        id: newAdmin._id,
        fullname: newAdmin.fullname,
        email: newAdmin.email,
        role: newAdmin.role,
        permissions: newAdmin.permissions
      }
    });

  } catch (error) {
    console.error("Admin registration error:", error);
    res.status(500).json({
      success: false,
      message: "Error during admin registration",
      error: error.message
    });
  }
};
