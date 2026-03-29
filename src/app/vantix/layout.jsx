export const metadata = {
  title: "VANTIX — AI Growth Intelligence",
  description: "Valmont Marketing Internal AI System",
};

export default function VantixLayout({ children }) {
  return (
    <div style={{ margin: 0, padding: 0, background: "#040810", minHeight: "100vh" }}>
      {children}
    </div>
  );
}
