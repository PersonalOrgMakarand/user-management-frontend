# User Management Frontend Application

A classic, old-style frontend web application built with plain HTML, CSS, and JavaScript (no frameworks) that consumes REST APIs from the User Management backend.

## Features

- ✅ **View All Users** - Display all users in a responsive table
- ✅ **Add New User** - Create new users with username, email, first name, and last name
- ✅ **Edit User** - Update existing user information
- ✅ **Delete User** - Remove users with confirmation modal
- ✅ **Responsive Design** - Works on desktop and mobile devices
- ✅ **Error Handling** - User-friendly error messages
- ✅ **Loading States** - Visual feedback during API calls

## API Integration

The application connects to:
- **Base URL**: `https://user-management-accenture.azurewebsites.net`
- **Swagger Docs**: [API Documentation](https://user-management-accenture.azurewebsites.net/swagger-ui/index.html)

### API Endpoints Used

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/users` | List all users |
| GET | `/users/{id}` | Get user by ID |
| POST | `/users` | Create new user |
| PUT | `/users/{id}` | Update existing user |
| DELETE | `/users/{id}` | Delete user |

## File Structure

```
user-management-frontend/
│
├── index.html      # Main HTML structure
├── styles.css      # CSS styling
├── app.js          # JavaScript logic and API calls
└── README.md       # This file
```

## How to Run

### Method 1: Direct File Opening
1. Simply open `index.html` in your web browser
2. The application will load and fetch users from the API

### Method 2: Using a Local Server (Recommended)

Using Python:
```bash
# Python 3
python -m http.server 8000
```

Using Node.js:
```bash
# Install http-server globally
npm install -g http-server

# Run server
http-server -p 8000
```

Using VS Code Live Server:
1. Install the "Live Server" extension
2. Right-click on `index.html`
3. Select "Open with Live Server"

Then open your browser and navigate to `http://localhost:8000`

## Usage Guide

### Adding a User
1. Fill in all required fields in the form:
   - Username
   - Email
   - First Name
   - Last Name
2. Click "Add User" button
3. User will be created and table will refresh automatically

### Editing a User
1. Click the "Edit" button on any user row
2. Form will populate with user data
3. Modify the fields as needed
4. Click "Update User" button
5. Click "Cancel" to discard changes

### Deleting a User
1. Click the "Delete" button on any user row
2. Confirm deletion in the modal dialog
3. User will be removed from the system

### Refreshing the List
- Click the "Refresh" button to reload all users from the server

## Browser Compatibility

Works in all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Opera (latest)

## Technical Details

### Technologies Used
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with gradients, animations, and flexbox
- **Vanilla JavaScript** - No frameworks or libraries
- **Fetch API** - For HTTP requests
- **Async/Await** - For handling asynchronous operations

### Key Features Implementation

**Form Validation**
- HTML5 required attributes
- Email type validation
- Client-side validation before API calls

**Error Handling**
- Try-catch blocks for all API calls
- User-friendly error messages
- Network error handling

**Security**
- XSS prevention with HTML escaping
- Input sanitization
- No sensitive data exposure

**User Experience**
- Loading states during API calls
- Success/Error message feedback
- Smooth animations and transitions
- Confirmation modal for destructive actions
- Responsive design for all screen sizes

## Customization

### Changing API URL
Edit the `API_BASE_URL` constant in `app.js`:
```javascript
const API_BASE_URL = 'your-api-url-here';
```

### Styling
All styles are in `styles.css`. Key variables to customize:
- Color scheme (purple gradient by default)
- Button colors
- Table styling
- Form layout

## Troubleshooting

**CORS Issues**
- If you see CORS errors, the backend needs to allow your origin
- Try using a local server instead of opening the file directly

**API Not Responding**
- Check if the backend service is running
- Verify the API URL is correct
- Check browser console for detailed error messages

**Users Not Loading**
- Check network tab in browser developer tools
- Ensure you have internet connection
- Verify API endpoint is accessible

## License

This project is created for educational purposes.

## Support

For issues or questions, please contact the development team.
