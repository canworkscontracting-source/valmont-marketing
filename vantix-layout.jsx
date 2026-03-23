// This file goes at: src/app/vantix/layout.jsx
// It overrides the root layout for ALL /vantix/* routes
// Removes the Valmont nav and footer — VANTIX is a standalone internal tool

export const metadata = {
  title: "VANTIX — AI Growth Intelligence",
  description: "Valmont Marketing Internal AI System",
};

export default function VantixLayout({ children }) {
  return (
    <div style={{
      margin: 0,
      padding: 0,
      background: "#040810",
      minHeight: "100vh",
      fontFamily: "'Outfit', sans-serif",
    }}>
      {children}
    </div>
  );
}
