content = open('src/components/VantixNova.jsx').read()
content = content.replace('<style>{styles}</style>', '')
content = content.replace(
    'const [open, setOpen] = useState(false);',
    'const [open, setOpen] = useState(false);\n\n  useEffect(() => {\n    const id = "vantix-nova-styles";\n    if (!document.getElementById(id)) {\n      const el = document.createElement("style");\n      el.id = id;\n      el.textContent = styles;\n      document.head.appendChild(el);\n    }\n  }, []);'
)
open('src/components/VantixNova.jsx', 'w').write(content)
print("Fixed.")
