// OBTPfe/scripts/fix-imports.mjs
import fs from 'fs';
import path from 'path';

function walk(dir){
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for(const ent of entries){
    const full = path.join(dir, ent.name);
    if(ent.isDirectory()){
      walk(full);
    } else if(/\.(ts|tsx)$/.test(ent.name)){
      let txt = fs.readFileSync(full, 'utf8');
      // Remove version suffix like @1.2.3 inside import strings
      // e.g. import ... from "@radix-ui/react-accordion@1.2.3";
      const newTxt = txt.replace(/(['"])(@[^'"]+?)@\d+\.\d+\.\d+(\1)/g, (m, q, pkg, q2) => {
        // m = quote + package + @version + quote
        // Return quote + package + quote
        return `${q}${pkg}${q2}`;
      });
      // also handle cases without leading @ (like lucide-react@0.487.0)
      const newTxt2 = newTxt.replace(/(['"])([^'"]+?)@\d+\.\d+\.\d+(\1)/g, (m, q, pkg, q2) => {
        return `${q}${pkg}${q2}`;
      });

      if(newTxt2 !== txt){
        fs.writeFileSync(full, newTxt2, 'utf8');
        console.log('Patched', full);
      }
    }
  }
}

const srcDir = path.join(process.cwd(), 'src');
if(!fs.existsSync(srcDir)){
  console.error('Cannot find src dir at', srcDir);
  process.exit(1);
}
walk(srcDir);
console.log('Done.');
