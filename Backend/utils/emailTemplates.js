export const getWelcomeEmailTemplate = (username) => `
  <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
    <div style="background: linear-gradient(to right, #ec4899, #8b5cf6); padding: 2px; border-radius: 10px;">
      <div style="background: white; padding: 30px; border-radius: 8px;">
        <h1 style="color: #ec4899; text-align: center; margin-bottom: 30px;">Welcome to BookStore! 📚</h1>
        
        <p style="color: #374151; font-size: 16px; line-height: 1.6;">
          Dear ${username},
        </p>
        
        <p style="color: #374151; font-size: 16px; line-height: 1.6;">
          Welcome to our reading community! We're thrilled to have you join us on this literary journey.
        </p>
        
        <div style="text-align: center; margin: 40px 0;">
          <a href="${process.env.FRONTEND_URL}/books" 
             style="background: linear-gradient(to right, #ec4899, #8b5cf6);
                    color: white;
                    padding: 12px 30px;
                    text-decoration: none;
                    border-radius: 25px;
                    font-weight: bold;">
            Explore Books
          </a>
        </div>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
          <p style="color: #6b7280; font-size: 14px; text-align: center;">
            Follow us on social media:
            <br>
            <a href="#" style="color: #ec4899; text-decoration: none; margin: 0 10px;">Twitter</a>
            <a href="#" style="color: #ec4899; text-decoration: none; margin: 0 10px;">Instagram</a>
            <a href="#" style="color: #ec4899; text-decoration: none; margin: 0 10px;">Facebook</a>
          </p>
        </div>
      </div>
    </div>
  </div>
`
