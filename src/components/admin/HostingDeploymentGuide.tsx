import React, { useState } from 'react';
import { 
  Globe, 
  Server, 
  CheckCircle2, 
  Copy, 
  ExternalLink, 
  Terminal, 
  ArrowRight, 
  ShieldCheck, 
  Cpu, 
  Layers, 
  Zap, 
  Sparkles, 
  Download, 
  Check, 
  AlertCircle,
  HelpCircle
} from 'lucide-react';
import { BUSINESS_INFO, BRAND_ASSETS } from '../../data/content';

export const HostingDeploymentGuide: React.FC = () => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [selectedProvider, setSelectedProvider] = useState<'vercel' | 'netlify' | 'cpanel' | 'cloudflare'>('vercel');
  const [checklist, setChecklist] = useState<Record<string, boolean>>({
    step1: true,
    step2: false,
    step3: false,
    step4: false,
    step5: false
  });

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const toggleCheck = (step: string) => {
    setChecklist(prev => ({ ...prev, [step]: !prev[step] }));
  };

  return (
    <div className="space-y-8 animate-in fade-in pb-12">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#0c2340] via-[#0f3460] to-[#0c2340] text-white p-6 sm:p-8 rounded-3xl border border-slate-700/80 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-cyan-500/10 to-transparent pointer-events-none" />
        
        <div className="max-w-3xl relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold border border-cyan-500/30">
            <Globe className="w-3.5 h-3.5" />
            <span>Deployment & Custom Domain Handbook</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            How to Host & Launch Crystal Refinishing to Your Domain
          </h2>

          <p className="text-sm text-slate-300 leading-relaxed">
            Your website is built with <strong>React 19, TypeScript, and Vite</strong>. It compiles into high-speed static assets in the <code className="bg-slate-800 text-cyan-300 px-1.5 py-0.5 rounded font-mono text-xs font-bold">dist/</code> directory. You can host it on modern high-speed edge clouds (Vercel, Netlify, Cloudflare) for <strong>$0/month</strong> with automatic free SSL security and attach your own domain.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-300">
            <span className="flex items-center gap-1.5 text-cyan-400">
              <ShieldCheck className="w-4 h-4" /> Free SSL HTTPS Included
            </span>
            <span className="flex items-center gap-1.5 text-emerald-400">
              <Zap className="w-4 h-4" /> Global CDN Edge Caching
            </span>
            <span className="flex items-center gap-1.5 text-blue-300">
              <Cpu className="w-4 h-4" /> Fast 1-Command Build
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Launch Checklist */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>Step-by-Step Launch Checklist</span>
            </h3>
            <p className="text-xs text-slate-500">Track your progress from code build to live domain</p>
          </div>
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-50 text-blue-700">
            {Object.values(checklist).filter(Boolean).length} / 5 Completed
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            { id: 'step1', title: '1. Brand Assets Embedded', desc: 'Logo, card banner, cover photo, and flyer connected.' },
            { id: 'step2', title: '2. Buy Domain Name', desc: 'E.g., crystalrefinishingaustin.com or crystalrefinishing.com' },
            { id: 'step3', title: '3. Build Production Bundle', desc: 'Run npm run build to generate the /dist folder.' },
            { id: 'step4', title: '4. Deploy to Host', desc: 'Connect to Vercel, Netlify, or upload to cPanel.' },
            { id: 'step5', title: '5. Configure DNS Records', desc: 'Add A Record (@) and CNAME (www) to your registrar.' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => toggleCheck(item.id)}
              className={`p-3.5 rounded-2xl border text-left transition-all flex items-start gap-3 cursor-pointer ${
                checklist[item.id]
                  ? 'bg-emerald-50/70 border-emerald-200 text-slate-900'
                  : 'bg-slate-50 border-slate-200/80 text-slate-600 hover:border-slate-300'
              }`}
            >
              <div className={`mt-0.5 w-5 h-5 rounded-md flex items-center justify-center shrink-0 text-xs ${
                checklist[item.id] ? 'bg-emerald-600 text-white font-bold' : 'border border-slate-300 bg-white'
              }`}>
                {checklist[item.id] && <Check className="w-3.5 h-3.5 stroke-[3]" />}
              </div>
              <div>
                <p className={`text-xs font-bold ${checklist[item.id] ? 'text-emerald-900' : 'text-slate-800'}`}>
                  {item.title}
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">{item.desc}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Provider Selection Tabs */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Server className="w-5 h-5 text-[#0062ff]" />
            <span>Choose Your Hosting Method</span>
          </h3>
          <span className="text-xs text-slate-500 font-medium">Click each option to view exact instructions</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[
            { id: 'vercel', name: 'Vercel (Recommended)', badge: 'Easiest & Free', icon: Zap },
            { id: 'netlify', name: 'Netlify (Drag & Drop)', badge: 'No Code Deploy', icon: Layers },
            { id: 'cloudflare', name: 'Cloudflare Pages', badge: 'Fastest Edge', icon: Globe },
            { id: 'cpanel', name: 'cPanel / Traditional', badge: 'GoDaddy / Bluehost', icon: Server }
          ].map((prov) => {
            const Icon = prov.icon;
            const isSelected = selectedProvider === prov.id;
            return (
              <button
                key={prov.id}
                onClick={() => setSelectedProvider(prov.id as any)}
                className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#0c2340] border-[#0c2340] text-white shadow-md'
                    : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <Icon className={`w-4 h-4 ${isSelected ? 'text-cyan-300' : 'text-[#0062ff]'}`} />
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                    isSelected ? 'bg-cyan-500/20 text-cyan-300' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {prov.badge}
                  </span>
                </div>
                <div className="text-xs font-bold leading-tight mt-1">{prov.name}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Provider Details View */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">

        {/* 1. VERCEL */}
        {selectedProvider === 'vercel' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#0062ff]">Recommended Option</span>
                <h4 className="text-xl font-bold text-slate-900">Host on Vercel (100% Free Tier, 2-Minute Setup)</h4>
                <p className="text-xs text-slate-500 mt-1">Automatic Vite detection, free automatic SSL certificates, and fast worldwide edge CDN.</p>
              </div>
              <a
                href="https://vercel.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 text-white hover:bg-slate-800 text-xs font-bold self-start"
              >
                <span>Open Vercel.com</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-2">
                <div className="w-7 h-7 rounded-lg bg-blue-100 text-[#0062ff] flex items-center justify-center font-black text-xs">1</div>
                <h5 className="text-xs font-bold text-slate-900">Create Free Vercel Account</h5>
                <p className="text-[12px] text-slate-600 leading-relaxed">
                  Go to <a href="https://vercel.com/signup" target="_blank" rel="noreferrer" className="text-blue-600 underline">vercel.com/signup</a> and sign in with GitHub, GitLab, or email.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-2">
                <div className="w-7 h-7 rounded-lg bg-blue-100 text-[#0062ff] flex items-center justify-center font-black text-xs">2</div>
                <h5 className="text-xs font-bold text-slate-900">Deploy Code or Run CLI</h5>
                <p className="text-[12px] text-slate-600 leading-relaxed">
                  Import your GitHub repository or run <code className="bg-slate-200 px-1 py-0.5 rounded font-mono text-[11px]">npx vercel</code> in your project directory.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-2">
                <div className="w-7 h-7 rounded-lg bg-blue-100 text-[#0062ff] flex items-center justify-center font-black text-xs">3</div>
                <h5 className="text-xs font-bold text-slate-900">Connect Domain</h5>
                <p className="text-[12px] text-slate-600 leading-relaxed">
                  Go to <strong>Settings &gt; Domains</strong> in your Vercel project, type your custom domain, and point DNS as shown below.
                </p>
              </div>
            </div>

            {/* CLI Command Helper */}
            <div className="p-4 rounded-2xl bg-[#0a192f] text-slate-300 space-y-2 font-mono text-xs">
              <div className="flex items-center justify-between text-slate-400 text-[11px] pb-1 border-b border-slate-800">
                <span className="flex items-center gap-1.5 text-cyan-300 font-bold">
                  <Terminal className="w-3.5 h-3.5" /> Instant Deploy via Terminal
                </span>
                <button
                  onClick={() => copyToClipboard('npm run build && npx vercel --prod', 'vercel-cli')}
                  className="flex items-center gap-1 hover:text-white transition-colors"
                >
                  {copiedKey === 'vercel-cli' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedKey === 'vercel-cli' ? 'Copied!' : 'Copy Command'}</span>
                </button>
              </div>
              <p className="text-emerald-400 font-semibold"># 1. Build the production files and deploy directly to Vercel:</p>
              <p className="text-white bg-slate-950/60 p-2.5 rounded-lg border border-slate-800">
                npm run build &amp;&amp; npx vercel --prod
              </p>
            </div>
          </div>
        )}

        {/* 2. NETLIFY */}
        {selectedProvider === 'netlify' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-600">Zero-Coding Deployment</span>
                <h4 className="text-xl font-bold text-slate-900">Host on Netlify (Drag & Drop the dist Folder)</h4>
                <p className="text-xs text-slate-500 mt-1">You don't even need git. Run the build command and simply drop the output folder into your browser.</p>
              </div>
              <a
                href="https://app.netlify.com/drop"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 text-xs font-bold self-start"
              >
                <span>Netlify Drop Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-black text-xs">1</div>
                <h5 className="text-xs font-bold text-slate-900">Run Build Command</h5>
                <p className="text-[12px] text-slate-600 leading-relaxed">
                  Run <code className="bg-slate-200 px-1 py-0.5 rounded font-mono text-[11px]">npm run build</code>. This generates a folder called <code className="font-bold text-slate-900">dist</code> containing your entire ready-to-serve website.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-black text-xs">2</div>
                <h5 className="text-xs font-bold text-slate-900">Drag & Drop</h5>
                <p className="text-[12px] text-slate-600 leading-relaxed">
                  Open <a href="https://app.netlify.com/drop" target="_blank" rel="noreferrer" className="text-emerald-700 underline font-semibold">app.netlify.com/drop</a> in Chrome or Safari and drag the <code className="font-bold">dist</code> folder right onto the page.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-black text-xs">3</div>
                <h5 className="text-xs font-bold text-slate-900">Assign Domain</h5>
                <p className="text-[12px] text-slate-600 leading-relaxed">
                  In your new Netlify site dashboard, click <strong>Domain Management &gt; Add custom domain</strong> and follow the DNS prompts.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 3. CLOUDFLARE PAGES */}
        {selectedProvider === 'cloudflare' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-600">Enterprise Speed, $0 Cost</span>
                <h4 className="text-xl font-bold text-slate-900">Host on Cloudflare Pages</h4>
                <p className="text-xs text-slate-500 mt-1">Unlimited bandwidth, world-class DDoS protection, and seamless integration if your domain DNS is already on Cloudflare.</p>
              </div>
              <a
                href="https://pages.cloudflare.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-600 text-white hover:bg-amber-700 text-xs font-bold self-start"
              >
                <span>Cloudflare Pages</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-3 text-xs text-slate-700 leading-relaxed">
              <p><strong>Option 1 (GitHub):</strong> Connect your GitHub repo in Cloudflare Dashboard &gt; Workers &amp; Pages. Set build command to <code className="bg-slate-200 px-1 py-0.5 rounded">npm run build</code> and build output directory to <code className="bg-slate-200 px-1 py-0.5 rounded">dist</code>.</p>
              <p><strong>Option 2 (Direct Upload via CLI):</strong></p>
              <div className="p-3 bg-[#0c2340] text-cyan-300 font-mono text-[11px] rounded-xl">
                npx wrangler pages deploy dist --project-name=crystal-refinishing
              </div>
            </div>
          </div>
        )}

        {/* 4. CPANEL / TRADITIONAL */}
        {selectedProvider === 'cpanel' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-indigo-600">Traditional Shared Hosting</span>
                <h4 className="text-xl font-bold text-slate-900">Host on GoDaddy, Bluehost, Hostinger, or Siteground (cPanel)</h4>
                <p className="text-xs text-slate-500 mt-1">Upload compiled HTML/JS files to public_html with a standard Single Page Application rewrite rule.</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5 text-xs">
                  <span className="font-bold text-slate-900">1. Run Build</span>
                  <p className="text-slate-600">Run <code className="bg-slate-200 px-1 py-0.5 rounded font-mono">npm run build</code>. Zip the contents of the generated <code className="font-bold">dist/</code> folder.</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5 text-xs">
                  <span className="font-bold text-slate-900">2. Upload to public_html</span>
                  <p className="text-slate-600">In your host cPanel, go to <strong>File Manager &gt; public_html</strong>, upload the zip, and click <strong>Extract</strong>.</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5 text-xs">
                  <span className="font-bold text-slate-900">3. Add .htaccess</span>
                  <p className="text-slate-600">Create a file named <code className="font-bold">.htaccess</code> in public_html with the rewrite rule below so subpages route properly.</p>
                </div>
              </div>

              {/* .htaccess snippet */}
              <div className="p-4 rounded-2xl bg-[#0a192f] text-slate-300 space-y-2 font-mono text-xs">
                <div className="flex items-center justify-between text-slate-400 text-[11px] pb-1 border-b border-slate-800">
                  <span className="text-cyan-300 font-bold">.htaccess (for Apache/cPanel SPA Routing)</span>
                  <button
                    onClick={() => copyToClipboard(`<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>`, 'htaccess')}
                    className="flex items-center gap-1 hover:text-white transition-colors"
                  >
                    {copiedKey === 'htaccess' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedKey === 'htaccess' ? 'Copied!' : 'Copy Code'}</span>
                  </button>
                </div>
                <pre className="text-slate-300 overflow-x-auto p-2 bg-slate-950/50 rounded-lg">
{`<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>`}
                </pre>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* DNS Configuration Cheat Sheet */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2 text-xs font-bold text-[#0062ff] uppercase tracking-wider">
            <Globe className="w-4 h-4" />
            <span>Domain Registrar DNS Settings</span>
          </div>
          <h4 className="text-xl font-bold text-slate-900 mt-1">
            How to Point Your Domain Name (e.g. at Namecheap, GoDaddy, Squarespace)
          </h4>
          <p className="text-xs text-slate-500 mt-1">
            After registering your domain name, log into your registrar’s DNS management dashboard and enter these two standard DNS records:
          </p>
        </div>

        {/* DNS Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                <th className="p-3">Record Type</th>
                <th className="p-3">Host / Name</th>
                <th className="p-3">Value / Points To</th>
                <th className="p-3">TTL</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800 font-mono">
              <tr className="hover:bg-slate-50/50">
                <td className="p-3 font-bold text-blue-600">A</td>
                <td className="p-3 font-bold">@ (or root)</td>
                <td className="p-3 font-bold text-slate-900">76.76.21.21 <span className="text-[11px] font-sans text-slate-400 font-normal">(for Vercel)</span></td>
                <td className="p-3 font-sans text-slate-500">Automatic / 3600</td>
                <td className="p-3 text-right">
                  <button
                    onClick={() => copyToClipboard('76.76.21.21', 'dns-a')}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-sans font-bold cursor-pointer"
                  >
                    {copiedKey === 'dns-a' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedKey === 'dns-a' ? 'Copied' : 'Copy'}</span>
                  </button>
                </td>
              </tr>
              <tr className="hover:bg-slate-50/50">
                <td className="p-3 font-bold text-emerald-600">CNAME</td>
                <td className="p-3 font-bold">www</td>
                <td className="p-3 font-bold text-slate-900">cname.vercel-dns.com <span className="text-[11px] font-sans text-slate-400 font-normal">(or your host target)</span></td>
                <td className="p-3 font-sans text-slate-500">Automatic / 3600</td>
                <td className="p-3 text-right">
                  <button
                    onClick={() => copyToClipboard('cname.vercel-dns.com', 'dns-cname')}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-sans font-bold cursor-pointer"
                  >
                    {copiedKey === 'dns-cname' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedKey === 'dns-cname' ? 'Copied' : 'Copy'}</span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/80 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-xs text-amber-900 leading-relaxed">
            <span className="font-bold">DNS Propagation Time:</span> DNS changes can take anywhere from 5 minutes to a few hours to propagate globally. Once propagated, Vercel/Netlify will automatically generate a free Let's Encrypt SSL certificate so your visitors see the secure padlock (<code className="font-bold">https://</code>).
          </div>
        </div>
      </div>

      {/* Suggested Domain Names for Crystal Refinishing */}
      <div className="bg-gradient-to-br from-slate-900 to-[#0c2340] text-white p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center gap-2 text-cyan-300 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          <span>Recommended Domain Name Ideas for Austin, Texas</span>
        </div>

        <h4 className="text-lg font-bold text-white">
          Great Domain Options to Register (Average cost: $10–$14/year)
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-2">
          {[
            { domain: 'crystalrefinishing.com', status: 'Primary Brand Domain' },
            { domain: 'crystalrefinishingaustin.com', status: 'High Local SEO Value' },
            { domain: 'austincrystalrefinishing.com', status: 'Austin Metro Specific' },
            { domain: 'crystalrefinish.com', status: 'Short & Memorable' },
            { domain: 'crystalrefinishingtx.com', status: 'Texas Statewide Scope' },
            { domain: 'crystalbathrefinishing.com', status: 'Bathtub Specific' }
          ].map((d) => (
            <div key={d.domain} className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700 flex flex-col justify-between">
              <span className="font-mono text-sm font-bold text-cyan-200">{d.domain}</span>
              <span className="text-[11px] text-slate-400 mt-1">{d.status}</span>
            </div>
          ))}
        </div>

        <p className="text-xs text-slate-400 pt-2">
          Recommended registrars: <strong>Namecheap.com</strong>, <strong>Cloudflare Registrar</strong> (at-cost pricing with zero markup), or <strong>Porkbun.com</strong>.
        </p>
      </div>

    </div>
  );
};
