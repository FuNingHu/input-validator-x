# Input Validator X

A URCap project for Universal Robots PolyScopeX demonstrating custom input validation.

## Features

- Custom input validation for UR dialog components
- Example validators for text input fields
- Integration with PolyScopeX SDK v0.19

## Project Structure

```
new-urcap/
├── new-urcap-backend/     # Backend service (Python/Docker)
├── new-urcap-frontend/    # Frontend UI (Angular)
├── manifest.yaml          # URCap manifest file
└── package.json          # Main build scripts
```

## Prerequisites

- Node.js (v20+)
- Docker
- npm
- PolyScopeX SDK

## Installation

```bash
# Install dependencies
npm install

# Build the project
npm run build
```

## Development

```bash
# Start frontend development server
npm run start

# Lint frontend code
npm run lint
```

## Building

```bash
# Build for AMD64 (default)
npm run build

# Build for ARM64
npm run build-arm
```

This will create a `.urcapx` file in the `target/` directory.

## Installing on Robot

```bash
# Install URCap to robot (specify port)
npm run install-urcap -- --port 45000

# Delete URCap from robot
npm run delete-urcap
```

## Custom Validation

The project demonstrates custom input validation using `InputValidator`:

```typescript
checkInputDialogTextValidator = (value: string | number): string | null => {
    const strValue = String(value);
    
    // No digits allowed
    if (strValue && /\d/.test(strValue)) {
        return 'Input cannot contain digits';
    }
    
    // Must start with uppercase letter
    if (strValue && strValue.length > 0 && !/^[A-Z]/.test(strValue)) {
        return 'Must start with an uppercase letter';
    }
    
    return null;
}
```

## License

See LICENSE file.

## Author

FuNingHu
