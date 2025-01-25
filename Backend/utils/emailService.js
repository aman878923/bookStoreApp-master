import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  secure: false,
  tls: {
    rejectUnauthorized: false,
  },
});

export const sendOrderConfirmationEmail = async (userEmail, order) => {
  // Map through books array with correct property access
  const orderItemsHtml = order.books.map(item => `
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.book.name}</td>
      <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.quantity}</td>
      <td style="padding: 10px; border-bottom: 1px solid #eee;">$${(item.price).toFixed(2)}</td>
      <td style="padding: 10px; border-bottom: 1px solid #eee;">$${(item.price * item.quantity).toFixed(2)}</td>
    </tr>
  `).join('');

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject: `Order Confirmation #${order._id}`,
    html: `
      <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
        <div style="background: linear-gradient(to right, #ec4899, #8b5cf6); padding: 2px; border-radius: 10px;">
          <div style="background: white; padding: 30px; border-radius: 8px;">
            <h1 style="color: #ec4899; text-align: center;">Thank You for Your Order!</h1>
            
            <p style="color: #374151;">Order ID: ${order._id}</p>
            <p style="color: #374151;">Order Date: ${new Date().toLocaleDateString()}</p>
            
            <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
              <thead>
                <tr style="background-color: #f3f4f6;">
                  <th style="padding: 10px; text-align: left;">Book</th>
                  <th style="padding: 10px; text-align: left;">Quantity</th>
                  <th style="padding: 10px; text-align: left;">Price</th>
                  <th style="padding: 10px; text-align: left;">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                ${orderItemsHtml}
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="3" style="padding: 10px; text-align: right; font-weight: bold;">Total:</td>
                  <td style="padding: 10px; font-weight: bold;">$${order.totalAmount.toFixed(2)}</td>
                </tr>
              </tfoot>
            </table>

            <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
              <h3 style="color: #374151;">Shipping Address:</h3>
              <p style="color: #6b7280;">
                ${order.shippingAddress.street}<br>
                ${order.shippingAddress.city}, ${order.shippingAddress.state} ${order.shippingAddress.zipCode}<br>
                ${order.shippingAddress.country}
              </p>
            </div>

            <div style="text-align: center; margin-top: 30px;">
              <a href="${process.env.FRONTEND_URL}/orders/${order._id}" 
                 style="background: linear-gradient(to right, #ec4899, #8b5cf6);
                        color: white;
                        padding: 12px 30px;
                        text-decoration: none;
                        border-radius: 25px;
                        font-weight: bold;">
                View Order Details
              </a>
            </div>
          </div>
        </div>
      </div>
    `
  };

  await transporter.sendMail(mailOptions);
};
