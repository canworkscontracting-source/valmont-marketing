import re

path = 'src/components/VantixNova.jsx'
content = open(path).read()

# Remove <style>{styles}</style> from JSX return
content = content.replace('<style>{styles}</style>', '')

# Inject useEffect style loader after useState(false)
old = 'const [open, setOpen] = useState(false);'
new = '''const [open, setOpen] = useState(false);

  useEffect(() => {
    const id = 'vantix-nova-styles';
    if (!document.getElementById(id)) {
      const el = document.createElement('style');
      el.id = id;
      el.textContent = styles;
      document.head.appendChild(el);
    }
    return () => {
      const el = document.getElementById(id);
      if (el) el.remove();
    };
  }, []);'''

content = content.replace(old, new, 1)
open(path, 'w').write(content)
print('Done — styles will now inject client-side via useEffect')
