import { useState, type FormEvent } from 'react';
import {
  ArrowDownToLine, ArrowRight, BriefcaseBusiness, Building2, CheckCircle2,
  CircleCheck, Gauge, Mail, MapPin, Menu, Phone, Send, ShieldCheck,
  TrainFront, Wrench, X, Boxes, Cog,
} from 'lucide-react';

const asset = (name: string) => `/images/${name}`;
const navigation = [
  ['Home', '#top'], ['About Us', '#company'], ['Railway Business', '#railway-business'],
  ['Manufacturing & Automation', '#manufacturing-automation'],
  ['Sales Distribution', '#sales-distribution'], ['Hose Assembly', '#hose-assembly'],
  ['Projects', '#experience'], ['Contact', '#contact'],
];

const segments = [
  {
    id: 'railway-business', num: 'SEGMENT 01', Icon: TrainFront, title: 'Railway Business', tag: 'Critical Rolling Stock Systems',
    color: 'orange', description: 'Specialized mechanical and electro-pneumatic equipment designed for high-stress rail transport and passenger coaches.',
    items: ['Wheel set earthing equipment', 'Electro-pneumatic pressurised systems', 'Vacuum toilet evacuation systems', 'Railway dampers & door systems', 'Stainless-steel compactor dustbins', 'Compression & Blago fittings'],
    cta: 'SPECIFY RAILWAY SYSTEMS',
  },
  {
    id: 'manufacturing-automation', num: 'SEGMENT 02', Icon: Cog, title: 'Manufacturing & Automation', tag: 'Turnkey Industrial Automation',
    color: 'green', description: 'Turnkey robotic integration, special-purpose tooling, and high-rate automated assembly lines for automotive and engineering plants.',
    items: ['Robotic welding cells (MIG / Spot)', 'Special-Purpose Machines (SPMs)', 'Hydro-pneumatic & servo presses', 'Automated leak-testing & marking rigs', 'Conveyors & overhead gantry systems', 'Calibrated servo torque tool systems'],
    cta: 'VIEW AUTOMATION CAPABILITY',
  },
  {
    id: 'sales-distribution', num: 'SEGMENT 03', Icon: Boxes, title: 'Sales Distribution', tag: 'Authorized Distribution',
    color: 'slate', description: 'Direct distribution and engineering support for global motion control, fluidics, and lubrication brand leaders.',
    items: ['Parker Hannifin product groups', 'Pneumatic cylinders, valves & air prep', 'Hirotaka Mfg Co. Ltd., Japan', 'Air-mist lubrication technologies', 'Hydraulic instrumentation valves', 'Authorized technical warranty & stock'],
    cta: 'REQUEST PRODUCT CATALOG',
  },
  {
    id: 'hose-assembly', num: 'SEGMENT 04', Icon: Wrench, title: 'Hose Assembly', tag: 'Hydraulic Fluid Conveyance',
    color: 'green', description: 'In-house hydraulic line manufacturing featuring high-precision cutting, skiving, swaging, and hydro-static burst testing.',
    items: ['1/8" to 2" diameter capacity range', 'Multi-spiral wire hydraulic hoses', 'High-pressure crimping & skiving', 'In-house static proof test rig', 'Traceable batch pressure certificates', 'Quick-disconnect couplers & adaptors'],
    cta: 'ORDER TESTED HOSE LINES',
  },
];

const products = [
  { code:'RLY-EARTH-01', status:'RDSO COMPLIANT', title:'Wheel Set Earthing Equipment', description:'Provides dedicated low-resistance return electrical paths from the rail bogie to rails, shielding axle bearings from harmful current discharge.', category:'rail', specs:[['Rated Current','Up to 1000A'],['Contact Element','Silver-graphite / Copper'],['Casing','Cast Bronze / Sealed IP65']] },
  { code:'AUT-ROBO-WELD', status:'TURNKEY CELL', title:'Robotic MIG / Spot Welding Cell', description:'Engineered welding stations with integrated 6-axis articulated arms, multi-station index tables, safety optoelectronics, and fume extraction.', category:'robotics', specs:[['Positioning Repeatability','± 0.05 mm'],['Cycle Time','Synchronized Dual Positioner'],['Safety Architecture','EN ISO 13849-1 Cat 4']] },
  { code:'FL-HOSE-HIGH', status:'ISO / SAE TESTED', title:'Precision Swaged Hose Lines', description:'High-pressure hydraulic and pneumatic flexible lines with skived stainless or carbon steel end-fittings, pressure tested up to proof margins.', category:'hose', specs:[['Size Range','1/8" to 2" NB'],['Pressure Capability','Up to 700 Bar (10,000 PSI)'],['End Connections','BSP, NPT, Metric, JIC, Flanged']] },
  { code:'RLY-PNEUM-02', status:'FAIL-SAFE DESIGN', title:'Pressurised EP Brake Panels', description:'Integrated manifold assemblies for precision railway pneumatic control, air reservoir isolation, and suspension levelling regulation.', category:'rail', specs:[['Operating Medium','Compressed Air (Filtered & Dry)'],['Manifold Material','Hard-anodized Al / SS316'],['Leak Integrity','< 0.01 bar / 10 min hold']] },
  { code:'AUT-SPM-PRESS', status:'CALIBRATED PRESSING', title:'Servo / Hydro-Pneumatic Presses', description:'Specialised bushing, bearing insertion, and crimping presses featuring closed-loop force-displacement monitoring.', category:'robotics', specs:[['Tonnage Range','10 kN to 500 kN'],['Feedback Control','LVDT + Load Cell (0.1% FS)'],['Data Logging','Ethernet/IP & USB Export']] },
  { code:'RLY-EVAC-VAC', status:'ECO-SANITATION', title:'Rail Coach Vacuum Toilet System', description:'High-efficiency vacuum ejection and retention module engineered for high-speed express and metro coaching stock.', category:'rail', specs:[['Water Consumption','< 0.5L per flush cycle'],['Vacuum Level','-0.4 to -0.6 bar'],['Control Logic','PLC Automated Diagnostics']] },
];

const projects = [
  ['PRJ-21-RW','Robotic Spot-Welding Cell Integration','Tier-1 Automotive Frame OEM','Twin robot synchronization, pneumatic indexing turn-table, cycle time reduction from 120s to 48s.','Commissioned'],
  ['PRJ-22-CS','Automated Conveyor & Sorting Line','Heavy Engineering Component Mfg','Palletized roller conveyor with pneumatic lift-and-transfer stations, bar code scanner tracking.','Operational'],
  ['PRJ-23-ST','Precision Servo Torque Assembly Station','Automotive Transmission Plant','Multi-spindle DC electric nutrunners with angular torque-angle verification and MES traceability.','Commissioned'],
  ['PRJ-24-MR','CNC Magneto-Rheological Finishing SPM','Precision Optics & Defense Lab','5-axis nano-surface polishing machine utilizing MR fluidic recirculating loop for sub-nanometer Ra.','Delivered'],
  ['PRJ-24-AL','Air-Mist Lubrication System Integration','High-Speed Steel Rolling Mill','Hirotaka Japan micro-droplet misting headers for high-speed rolling bearings, reducing oil consumption by 65%.','Operational'],
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [category, setCategory] = useState('all');
  const [notice, setNotice] = useState('');
  const filteredProducts = products.filter((product) => category === 'all' || product.category === category);

  const submitRFQ = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const subject = `Technical RFQ — ${data.get('company')}`;
    const body = [
      `Name: ${data.get('name')}`, `Company / Organization: ${data.get('company')}`,
      `Work email: ${data.get('email')}`, `Phone number: ${data.get('phone')}`,
      `Area of interest / segment: ${data.get('segment')}`, '',
      'Brief technical requirement and specifications:', String(data.get('requirement')),
    ].join('\n');
    window.location.href = `mailto:info@airconautomation.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setNotice('Your email app should open with this enquiry prepared. Please review the details and press Send in your email app; your request has not been sent yet.');
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className="site-header">
        <div className="header-inner">
          <a className="wordmark" href="#top" aria-label="Aircon Automation home" onClick={closeMenu} data-testid="link-header-home">
            <img src={asset('aircon-wordmark-original.jpeg')} alt="AIRCON Automation" width={218} height={54} />
          </a>
          <nav className="desktop-nav" aria-label="Main navigation">
            {navigation.map(([label, href]) => <a key={href} href={href} data-testid={`link-navigation-desktop-${href.slice(1)}`}>{label}</a>)}
          </nav>
          <a href="#contact" className="nav-cta" data-testid="link-discuss-requirement">Discuss Your Requirement <ArrowRight size={14} /></a>
          <button className="menu-toggle" data-testid="button-toggle-mobile-navigation" aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen((value) => !value)}>
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
        <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation" hidden={!menuOpen} onKeyDown={(event) => { if (event.key === 'Escape') closeMenu(); }}>
          {navigation.map(([label, href]) => <a key={href} href={href} onClick={closeMenu} data-testid={`link-navigation-mobile-${href.slice(1)}`}>{label}</a>)}
          <a href="#contact" className="nav-cta" onClick={closeMenu} data-testid="link-discuss-requirement-mobile">Discuss Your Requirement <ArrowRight size={14} /></a>
        </nav>
      </header>

      <main id="top">
        <section className="hero">
          <div className="container hero-grid">
            <div className="hero-copy reveal">
              <p className="eyebrow">ENGINEERING SOLUTIONS · IMT MANESAR, INDIA</p>
              <h1>AIRCON<br />AUTOMATION</h1>
              <p className="hero-subheading">ENGINEERING &amp; AUTOMATION SOLUTIONS</p>
              <p className="hero-description">Industrial automation, special-purpose manufacturing systems, railway engineering equipment, and high-pressure hydraulic hose assemblies engineered for demanding operational environments.</p>
              <div className="hero-actions">
                <a href="#segments" className="button-primary" data-testid="link-explore-capabilities">Explore Our Capabilities <ArrowRight size={15} /></a>
                <a href="#contact" className="button-outline" data-testid="link-submit-technical-rfq">Submit Technical RFQ</a>
              </div>
            </div>
            <div className="hero-image-wrap">
              <img src={asset('aircon-automation-cell.jpeg')} alt="Aircon robotic automation cell at the Manesar facility" width={512} height={279} fetchPriority="high" decoding="async" />
              <div className="image-caption"><span>INDUSTRIAL AUTOMATION · IMT MANESAR</span><span>Engineering in operation</span></div>
            </div>
          </div>
        </section>
        <div className="stats-band">
          <div className="container stats" aria-label="Company facts">
            <div className="stat" data-testid="stat-founded"><strong>2005</strong><span>Established in IMT Manesar, Haryana</span></div>
            <div className="stat" data-testid="stat-team-size"><strong>~60</strong><span>Specialized Engineering &amp; Technical Staff</span></div>
            <div className="stat" data-testid="stat-business-segments"><strong>4</strong><span>Core Principal Industrial Business Segments</span></div>
            <div className="stat" data-testid="stat-quality-system"><strong>ISO 9001</strong><span>Certified Quality Management System</span></div>
          </div>
        </div>

        <section id="company" className="section">
          <div className="container about-grid">
            <div className="about-photo">
              <img src={asset('manesar-facility.jpeg')} alt="Engineering and railway systems inside the IMT Manesar facility" width={512} height={279} loading="lazy" decoding="async" />
              <div className="photo-caption"><span><small>Infrastructure</small><br />Plot No. 60, Sector 3, IMT Manesar Facility</span><span>Reg. Office Delhi</span></div>
            </div>
            <div className="section-copy">
              <p className="eyebrow">ENGINEERING EXCELLENCE &amp; CORPORATE PROFILE</p>
              <h2>Engineering Solutions Built Around Industry</h2>
              <p>Founded in 2005, Aircon Automation India Pvt. Ltd. has established an institutional track record in heavy engineering, industrial automation, and rolling stock systems. Operating out of our dedicated plant in IMT Manesar, Gurugram, we combine engineering rigor, custom SPM fabrication, and precision hydraulic assembly.</p>
              <p>Our capabilities span design validation, structural fabrication, hydraulic fluid handling, and automated integration for tier-1 automotive suppliers, global machinery partners, and Indian Railways.</p>
              <div className="feature-pair">
                <div className="feature-box"><strong><Wrench size={15} /> Custom Tooling &amp; Fixtures</strong><p>High-accuracy MIG and spot-welding fixtures built to tight tolerances, ensuring repeatable clamping and dimensional consistency.</p></div>
                <div className="feature-box"><strong><BriefcaseBusiness size={15} /> OEM &amp; Tier-1 Integration</strong><p>Long-standing authorized integration for world-class automation and motion control components including Parker Hannifin and Hirotaka Japan.</p></div>
              </div>
            </div>
          </div>
        </section>

        <section id="segments" className="section section-tint">
          <div className="container">
            <div className="section-heading">
              <div><p className="eyebrow">CORE CAPABILITIES</p><h2>Four Principal Business Segments</h2></div>
              <p className="intro">Integrated turnkey engineering spanning rolling stock mechanisms, automated manufacturing, component distribution, and certified fluid conveyance.</p>
            </div>
            <div className="segment-grid">
              {segments.map(({id, num, Icon, title, tag, color, description, items, cta}) => (
                <article className="segment-card" id={id} key={num} data-testid={`card-segment-${id}`}>
                  <div className="segment-top"><span>{num}</span><Icon size={17} /></div>
                  <h3>{title}</h3><span className={`tag ${color}`}>{tag}</span>
                  <p>{description}</p>
                  <ul className="segment-list">{items.map((item) => <li key={item}><CircleCheck size={13} />{item}</li>)}</ul>
                  <a className="card-link" href="#contact" data-testid={`link-segment-enquiry-${id}`}>{cta} <ArrowRight size={12} /></a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="products" className="section">
          <div className="container">
            <div className="center-heading">
              <p className="eyebrow">EQUIPMENT &amp; PORTFOLIO SPECIFICATIONS</p>
              <h2>Technical Product Directory</h2>
              <p>Select an engineering category to inspect technical parameters, build standards, and verification metrics.</p>
            </div>
            <div className="filters" role="group" aria-label="Filter products by category">
              {[['all','ALL CATEGORIES'],['rail','RAILWAY SYSTEMS'],['robotics','ROBOTIC CELLS & SPMS'],['hose','HOSE & FLUIDICS']].map(([id,label]) => (
                <button key={id} type="button" className="filter-button" data-testid={`button-filter-products-${id}`} aria-pressed={category === id} onClick={() => setCategory(id)}>{label}</button>
              ))}
            </div>
            <div className="product-grid" aria-live="polite">
              {filteredProducts.map((product) => (
                <article className="product-card" key={product.code} data-testid={`card-product-${product.code}`}>
                  <div className="product-meta"><span className="product-code">{product.code}</span><span className="product-status">{product.status}</span></div>
                  <h3>{product.title}</h3><p>{product.description}</p>
                  <div className="specs">{product.specs.map(([label,value]) => <div className="spec-row" key={label}><span>{label}:</span><strong>{value}</strong></div>)}</div>
                  <div className="product-footer"><span>{product.category === 'hose' ? 'Static test certified' : 'Custom specs on demand'}</span><a href="#contact" data-testid={`link-product-rfq-${product.code}`}>TECHNICAL RFQ <ArrowRight size={11} /></a></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="experience" className="section section-tint">
          <div className="container">
            <div className="projects-head">
              <div><p className="eyebrow">DELIVERED BENCHMARKS</p><h2>Projects &amp; Engineering<br />Experience</h2></div>
              <div className="nda-note"><ShieldCheck size={13} /> Project demonstrations configured for management review; customer NDA items obscured.</div>
            </div>
            <div className="project-table-wrap">
              <table className="project-table">
                <thead><tr><th>Project Code</th><th>System Description</th><th>Client Domain</th><th>Technical Scope &amp; Key Specification</th><th>Status</th></tr></thead>
                <tbody>{projects.map(([code,system,client,scope,status]) => <tr key={code}><td>{code}</td><td>{system}</td><td>{client}</td><td>{scope}</td><td><span className="status-dot">● &nbsp;{status}</span></td></tr>)}</tbody>
              </table>
            </div>
          </div>
        </section>

        <section id="quality" className="section">
          <div className="container quality-grid">
            <div className="quality-copy">
              <p className="eyebrow">TESTING RIGS &amp; METROLOGY</p>
              <h2>Comprehensive Testing &amp; ISO Quality Protocols</h2>
              <p>Zero defect tolerance governs our assembly lines. Every hydraulic line, pneumatic valve cluster, and structural rail sub-assembly is certified through standard operating inspection routines and documented validation protocols.</p>
              <div className="quality-items">
                <article className="quality-item"><h3><Gauge size={17} /> In-House Static Hydraulic Proof Rig</h3><p>Capable of hydro-static pressure testing up to 1000 Bar. Hoses undergo mandatory hold tests with digital recording to prevent field delamination or crimp failure.</p></article>
                <article className="quality-item"><h3><CheckCircle2 size={17} /> Pneumatic Differential Leak Testing</h3><p>Differential pressure decay instrumentation ensuring rail brake blocks, cylinders, and vacuum components comply with leakage allowances under RDSO guidelines.</p></article>
                <article className="quality-item"><h3><ShieldCheck size={17} /> Weld Macro-Etch &amp; Torque Verification</h3><p>Routine weld seam cross-sectioning and calibrated torque testing across all fasteners to maintain structural integrity under extreme vibration duty.</p></article>
              </div>
            </div>
            <aside className="quality-panel">
              <h3>Certified Quality Management System</h3>
              <div className="quality-row"><div className="quality-row-head"><span>Standard Scope</span><b>Active Audit</b></div><p>ISO 9001:2015 Framework covering Design, Manufacturing, Assembly, Testing, and Supply of Automation Systems, Fixtures, and Railway Equipment.</p></div>
              <div className="quality-row"><div className="quality-row-head"><span>Traceability &amp; Calibration</span><b>NABL Accredited</b></div><p>All master gauges, pressure transducers, micrometers, and load sensors are calibrated annually against NABL-traceable reference standards.</p></div>
              <div className="quality-row"><div className="quality-row-head"><span>Document Control</span><b>Level 3 ERP</b></div><p>Raw material test certificates (MTC), heat numbers, and inspection punch cards preserved for 10-year auditability across rail deliverables.</p></div>
              <div className="quality-footer"><span>QA DEPARTMENT — IMT MANESAR</span><a href="#contact" data-testid="link-request-qa-manual">REQUEST QA MANUAL <ArrowDownToLine size={12} /></a></div>
            </aside>
          </div>
        </section>

        <section id="contact" className="section section-tint">
          <div className="container contact-grid">
            <div className="contact-left">
              <p className="eyebrow">DIRECT PROCUREMENT &amp; INQUIRIES</p>
              <h2>Let’s Discuss Your Engineering Requirement</h2>
              <p>Connect directly with our engineering sales leads at IMT Manesar. Submit preliminary project specifications, RFQ dossiers, or schedule an onsite technical plant evaluation.</p>
              <div className="contact-details">
                <div className="contact-row"><MapPin size={16} /><div><small>MANUFACTURING WORKS</small><p>Aircon Automation India Pvt. Ltd.<br />Plot No. 60, Sector 3, IMT Manesar,<br />Gurugram – 122050, Haryana, India</p></div></div>
                <div className="contact-row"><Building2 size={16} /><div><small>REGISTERED CORPORATE OFFICE</small><p>Rohini, New Delhi – 110085, India</p></div></div>
                <div className="contact-row"><Phone size={16} /><div><small>TELEPHONES</small><a href="tel:+911244382248" data-testid="link-phone-landline">Landline: +91 124-4382248</a><a href="tel:+919311783461" data-testid="link-phone-mobile">Mobile / Helpline: +91 9311783461</a></div></div>
                <div className="contact-row"><Mail size={16} /><div><small>OFFICIAL CORRESPONDENCE</small><a href="mailto:info@airconautomation.com" data-testid="link-email-contact">info@airconautomation.com</a></div></div>
              </div>
              <div className="confidential"><ShieldCheck size={15} /> Commercial and technical proposals governed by non-disclosure protocols.</div>
            </div>
            <form className="rfq-form" onSubmit={submitRFQ}>
              <div className="form-heading"><div><h3>Technical RFQ Submission</h3><p>Fill out this requisition form to receive application assessment.</p></div><span className="demo-label">DEMO MODE</span></div>
              <div className="form-grid">
                <div className="field"><label htmlFor="rfq-name">FULL NAME *</label><input id="rfq-name" name="name" type="text" data-testid="input-rfq-name" placeholder="e.g. Rajesh Sharma" required autoComplete="name" /></div>
                <div className="field"><label htmlFor="rfq-company">COMPANY / ORGANIZATION *</label><input id="rfq-company" name="company" type="text" data-testid="input-rfq-company" placeholder="e.g. Alstom / BHEL / Tata Motors" required autoComplete="organization" /></div>
                <div className="field"><label htmlFor="rfq-email">WORK EMAIL *</label><input id="rfq-email" name="email" type="email" data-testid="input-rfq-email" placeholder="name@company.com" required autoComplete="email" /></div>
                <div className="field"><label htmlFor="rfq-phone">PHONE NUMBER *</label><input id="rfq-phone" name="phone" type="tel" data-testid="input-rfq-phone" placeholder="+91 98XXXXXXXX" required autoComplete="tel" /></div>
                <div className="field field-full"><label htmlFor="rfq-segment">AREA OF INTEREST / SEGMENT *</label><select id="rfq-segment" name="segment" data-testid="select-rfq-segment" required defaultValue="Railway Business (Earthing, Valves, Vacuum Toilets, Dampers)"><option value="Railway Business (Earthing, Valves, Vacuum Toilets, Dampers)">Railway Business (Earthing, Valves, Vacuum Toilets, Dampers)</option><option>Manufacturing &amp; Automation</option><option>Sales Distribution</option><option>Hose Assembly &amp; Fluidics</option><option>Other engineering requirement</option></select></div>
                <div className="field field-full"><label htmlFor="rfq-requirement">BRIEF TECHNICAL REQUIREMENT &amp; SPECIFICATIONS *</label><textarea id="rfq-requirement" name="requirement" data-testid="input-rfq-requirement" required minLength={10} placeholder="Please state operating pressure, cycle requirements, target delivery schedule, or reference drawings..." /></div>
              </div>
              <div className="form-actions"><button className="button-primary" type="submit" data-testid="button-submit-rfq">SUBMIT TECHNICAL RFQ <Send size={14} /></button><span className="form-note">Demo Mode: This form prepares your enquiry for review in your email app.</span></div>
              {notice && <p className="submit-message" role="status" data-testid="status-rfq-mail-draft">{notice}</p>}
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand"><a className="wordmark" href="#top" aria-label="AIRCON Automation home" data-testid="link-footer-home"><img src={asset('aircon-wordmark-original.jpeg')} alt="AIRCON Automation" width={218} height={54} /></a><p>Engineering solutions for railway systems, industrial automation, and precision fluid conveyance.</p></div>
            <div className="footer-col"><h3>Company</h3><a href="#company" data-testid="link-footer-company">Corporate Profile</a><a href="#segments" data-testid="link-footer-segments">Business Segments</a><a href="#experience" data-testid="link-footer-experience">Engineering Experience</a><a href="#quality" data-testid="link-footer-quality">Quality Protocols</a></div>
            <div className="footer-col"><h3>Capabilities</h3><a href="#railway-business" data-testid="link-footer-railway">Railway Systems</a><a href="#manufacturing-automation" data-testid="link-footer-manufacturing">Manufacturing &amp; Automation</a><a href="#products" data-testid="link-footer-products">Product Directory</a><a href="#hose-assembly" data-testid="link-footer-hose">Hose Assembly</a></div>
            <div className="footer-col"><h3>Contact</h3><p>Plot No. 60, Sector 3,<br />IMT Manesar, Haryana</p><a href="tel:+911244382248" data-testid="link-footer-phone">+91 124-4382248</a><a href="mailto:info@airconautomation.com" data-testid="link-footer-email">info@airconautomation.com</a></div>
          </div>
          <div className="copyright"><span>© {new Date().getFullYear()} Aircon Automation India Pvt. Ltd. All rights reserved.</span><span>Engineering &amp; manufacturing · IMT Manesar, India</span></div>
        </div>
      </footer>
    </>
  );
}

export default App;
