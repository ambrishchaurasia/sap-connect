// This is a mock implementation for demonstration purposes
// In a real application, use a proper authentication library like NextAuth.js or Supabase Auth

// Simulated user storage (in-memory for demo, mimics a DB)
const mockUsers: { email: string; password: string }[] = [];

// Mock signup function
export async function signupUser(email: string, password: string): Promise<boolean> {
  console.log("Signing up user:", email);

  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Check if email is valid and password meets requirements
  if (!email.endsWith("@stu.upes.ac.in")) {
    console.log("Signup failed: Invalid email domain");
    return false;
  }
  if (password.length < 8) {
    console.log("Signup failed: Password too short");
    return false;
  }

  // Check if user already exists
  if (mockUsers.some((user) => user.email === email)) {
    console.log("Signup failed: User already exists");
    return false;
  }

  // Store user (mimics DB save, but without hashing for simplicity)
  mockUsers.push({ email, password });
  console.log("User saved in mock storage:", email);

  // Store session in localStorage
  localStorage.setItem("user", JSON.stringify({ email }));
  return true;
}

// Mock login function
export async function loginUser(email: string, password: string): Promise<boolean> {
  console.log("Logging in user:", email);

  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Check if user exists and password matches
  const user = mockUsers.find((u) => u.email === email && u.password === password);
  if (!user) {
    console.log("Login failed: Invalid email or password");
    return false;
  }

  // Store session in localStorage
  localStorage.setItem("user", JSON.stringify({ email }));
  return true;
}

// Mock OTP sending function
export async function sendOTP(email: string): Promise<boolean> {
  console.log("Sending OTP to:", email);

  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Validate email domain
  if (!email.endsWith("@stu.upes.ac.in")) {
    console.log("Send OTP failed: Invalid email domain");
    return false;
  }

  return true;
}

// Mock OTP verification function
export async function verifyOTP(email: string, otp: string): Promise<boolean> {
  console.log("Verifying OTP for:", email, "OTP:", otp);

  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Accept any 6-digit OTP
  if (otp.length !== 6 || !/^\d+$/.test(otp)) {
    console.log("Verify OTP failed: Invalid OTP format");
    return false;
  }

  return true;
}