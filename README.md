# MOOK Robotics Hub

MOOK Robotics Hub is an interactive encyclopedia about robotics with user accounts, admin functionality, and comprehensive robot information. The platform is designed to be engaging and futuristic, making robotics knowledge accessible to everyone.

## Features

- **Interactive Robot Encyclopedia**: Detailed information about various robots including technical specifications, applications, and media.
- **User Accounts**: Visitors can create accounts to save favorite robots and receive updates.
- **Admin Dashboard**: Comprehensive admin interface to manage robots, categories, users, and content.
- **Rich Media Support**: Support for images, videos, and interactive elements.
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices.
- **AI Assistant**: An interactive AI guide to help visitors navigate the site.
- **Comment System**: Users can discuss robots and share insights.

## Project Structure

```
mook-robotics-hub-n2/
├── index.html             # Main homepage
├── robot-details.html     # Individual robot details page
├── css/
│   ├── styles.css         # Main styles
│   ├── robot-details.css  # Styles for robot details page
│   └── admin.css          # Admin dashboard styles
├── js/
│   ├── main.js            # Main JavaScript for homepage
│   ├── robot-details.js   # JavaScript for robot details page
│   └── admin.js           # Admin dashboard functionality
├── admin/
│   ├── dashboard.html     # Admin dashboard
│   ├── add-robot.html     # Add new robot form
│   └── ...                # Other admin pages
├── img/                   # Image assets
└── README.md              # This file
```

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- Basic knowledge of HTML, CSS, and JavaScript (for development)
- GitHub account (for deployment on GitHub Pages)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/Taikibonnet/mook-robotics-hub-n2.git
   ```

2. Navigate to the project directory:
   ```
   cd mook-robotics-hub-n2
   ```

3. Open `index.html` in your browser to view the site locally.

### Deployment on GitHub Pages

1. Go to your repository settings on GitHub
2. Scroll down to the GitHub Pages section
3. Select the main branch as the source
4. Save the settings
5. Your site will be published at `https://username.github.io/mook-robotics-hub-n2/`

## Admin Access

To access the admin dashboard:

1. Go to the website and click "Log In"
2. Use the admin credentials:
   - Email: tgen.robotics@gmail.com
   - Password: Admin123!
3. You will be redirected to the admin dashboard

## Development

### Adding New Robots

1. Log in as admin
2. Navigate to the admin dashboard
3. Click "Add New Robot"
4. Fill in the details and upload images
5. Save the robot entry

### Customizing Styles

The project uses a modular CSS approach:

- `styles.css`: Global styles and homepage
- `robot-details.css`: Styles for individual robot pages
- `admin.css`: Admin dashboard styles

Modify these files to change the look and feel of the website.

## Future Plans

- Mobile application development
- Enhanced AI assistant capabilities
- User contribution system for robot information
- Advanced search functionality
- Integration with robotics APIs for real-time information

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Font Awesome for icons
- Google Fonts for typography
- Boston Dynamics, SoftBank Robotics, and other robotics companies for inspiration
