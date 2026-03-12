# 🚀 QUICK DEPLOYMENT GUIDE

## 5-Minute Deploy to Vercel

### Step 1: Install Dependencies
```bash
cd valmont-premium
npm install
```

### Step 2: Test Locally
```bash
npm run dev
```
Open http://localhost:3000 - verify everything works

### Step 3: Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
```

Create a new repo on GitHub, then:
```bash
git remote add origin YOUR_GITHUB_URL
git push -u origin main
```

### Step 4: Deploy on Vercel
1. Go to https://vercel.com
2. Sign in with GitHub
3. Click "New Project"
4. Import your repository
5. Click "Deploy" (Vercel auto-configures Next.js)
6. ✅ **LIVE IN 60 SECONDS!**

### Step 5: Add Your Domain (valmontmarketing.com)

**In Vercel:**
1. Go to Project Settings → Domains
2. Add: `valmontmarketing.com`
3. Copy the DNS records shown

**In Squarespace:**
1. Go to Domains → DNS Settings
2. Add these records:

```
Type: A
Host: @
Value: 76.76.21.21

Type: CNAME  
Host: www
Value: cname.vercel-dns.com
```

3. Save changes
4. Wait 5-10 minutes
5. ✅ **LIVE AT YOUR DOMAIN!**

---

## 🎉 You're Done!

- ✅ $0/month hosting (save $324/year)
- ✅ Premium AI lab design
- ✅ Lightning fast performance
- ✅ Automatic SSL/HTTPS
- ✅ Instant global CDN
- ✅ Auto-deployments on git push

---

## 📧 Contact Form Setup (Optional)

The form logs to console by default. To make it send emails:

**Option 1: Vercel Contact Form (Free)**
```tsx
// In contact/page.tsx, add to <form>:
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

**Option 2: Create API Route**
```bash
npm install resend
```

Create `src/app/api/contact/route.ts` with email logic.

---

## 🔧 Future Updates

To update your live site:
```bash
git add .
git commit -m "Update content"
git push
```

Vercel automatically deploys in 30 seconds!

---

## ⚡ Performance Tips

Your site is already optimized, but for even better scores:

1. **Add Images**: Use Next.js Image component
   ```tsx
   import Image from 'next/image'
   <Image src="/logo.png" alt="Logo" width={100} height={100} />
   ```

2. **Analytics**: Add Vercel Analytics
   ```bash
   npm install @vercel/analytics
   ```

3. **SEO**: Update meta descriptions in each page's metadata

---

**Need help?** Check README.md for full documentation.
