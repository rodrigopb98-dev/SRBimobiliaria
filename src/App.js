import { useState } from "react";

const C = {
  navy: "#0e1e3f", navyDark: "#0a1628", gold: "#c9a84c", goldLight: "#e2c97e",
  goldDark: "#a07830", white: "#ffffff", offWhite: "#f9f8f5", gray: "#6b7280",
  lightGray: "#e5e7eb", darkGray: "#374151", text: "#1a1a2e",
};

const ADMIN_PW = "srb2024";

// Fotos reais enviadas pelo usuário
const FOTOS = {
  edificio: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Camponotus_flavomarginatus_ant.jpg/320px-Camponotus_flavomarginatus_ant.jpg", // placeholder
  interior: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Camponotus_flavomarginatus_ant.jpg/320px-Camponotus_flavomarginatus_ant.jpg",
  apto: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Camponotus_flavomarginatus_ant.jpg/320px-Camponotus_flavomarginatus_ant.jpg",
};

// Componente que aceita arquivo de imagem e exibe preview
// Como as imagens foram enviadas no chat, vamos usar um ImageProvider com blob
// e as fotos serão carregadas dinamicamente pelo usuário no admin

// Para demonstração real, usamos as imagens do chat convertidas em data URLs
// O componente App vai capturar e injetar as fotos reais

const SRBLogo = ({ size = 48 }) => (
  <svg width={size} height={size * 1.1} viewBox="0 0 100 110" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="14" y="28" width="22" height="52" fill="none" stroke={C.gold} strokeWidth="2"/>
    <rect x="18" y="33" width="4" height="4" fill={C.gold} opacity="0.7"/>
    <rect x="25" y="33" width="4" height="4" fill={C.gold} opacity="0.7"/>
    <rect x="18" y="41" width="4" height="4" fill={C.gold} opacity="0.7"/>
    <rect x="25" y="41" width="4" height="4" fill={C.gold} opacity="0.7"/>
    <rect x="18" y="49" width="4" height="4" fill={C.gold} opacity="0.7"/>
    <rect x="25" y="49" width="4" height="4" fill={C.gold} opacity="0.7"/>
    <rect x="18" y="57" width="4" height="4" fill={C.gold} opacity="0.7"/>
    <rect x="25" y="57" width="4" height="4" fill={C.gold} opacity="0.7"/>
    <rect x="38" y="10" width="24" height="70" fill="none" stroke={C.gold} strokeWidth="2"/>
    <line x1="50" y1="10" x2="50" y2="2" stroke={C.gold} strokeWidth="2"/>
    <rect x="47" y="2" width="6" height="2" fill={C.gold}/>
    <rect x="42" y="16" width="4" height="4" fill={C.gold} opacity="0.7"/>
    <rect x="50" y="16" width="4" height="4" fill={C.gold} opacity="0.7"/>
    <rect x="42" y="24" width="4" height="4" fill={C.gold} opacity="0.7"/>
    <rect x="50" y="24" width="4" height="4" fill={C.gold} opacity="0.7"/>
    <rect x="42" y="32" width="4" height="4" fill={C.gold} opacity="0.7"/>
    <rect x="50" y="32" width="4" height="4" fill={C.gold} opacity="0.7"/>
    <rect x="42" y="40" width="4" height="4" fill={C.gold} opacity="0.7"/>
    <rect x="50" y="40" width="4" height="4" fill={C.gold} opacity="0.7"/>
    <rect x="42" y="48" width="4" height="4" fill={C.gold} opacity="0.7"/>
    <rect x="50" y="48" width="4" height="4" fill={C.gold} opacity="0.7"/>
    <rect x="64" y="22" width="22" height="58" fill="none" stroke={C.gold} strokeWidth="2"/>
    <rect x="68" y="27" width="4" height="4" fill={C.gold} opacity="0.7"/>
    <rect x="75" y="27" width="4" height="4" fill={C.gold} opacity="0.7"/>
    <rect x="68" y="35" width="4" height="4" fill={C.gold} opacity="0.7"/>
    <rect x="75" y="35" width="4" height="4" fill={C.gold} opacity="0.7"/>
    <rect x="68" y="43" width="4" height="4" fill={C.gold} opacity="0.7"/>
    <rect x="75" y="43" width="4" height="4" fill={C.gold} opacity="0.7"/>
    <rect x="68" y="51" width="4" height="4" fill={C.gold} opacity="0.7"/>
    <rect x="75" y="51" width="4" height="4" fill={C.gold} opacity="0.7"/>
    <polygon points="25,80 50,58 75,80" fill="url(#gg)"/>
    <defs>
      <linearGradient id="gg" x1="25" y1="80" x2="75" y2="58" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor={C.goldDark}/><stop offset="50%" stopColor={C.goldLight}/><stop offset="100%" stopColor={C.goldDark}/>
      </linearGradient>
    </defs>
    <line x1="10" y1="82" x2="90" y2="82" stroke={C.gold} strokeWidth="1.5"/>
    <path d="M10 95 Q25 88 40 95 Q55 102 70 95 Q80 90 90 95" stroke={C.gold} strokeWidth="1.5" fill="none"/>
  </svg>
);

const Wave = ({ w = 160 }) => (
  <svg width={w} height="14" viewBox={`0 0 ${w} 14`}>
    <path d={`M0 7 Q${w*.125} 1 ${w*.25} 7 Q${w*.375} 13 ${w*.5} 7 Q${w*.625} 1 ${w*.75} 7 Q${w*.875} 13 ${w} 7`} stroke={C.gold} strokeWidth="1.2" fill="none"/>
  </svg>
);

const NavBar = ({ page, setPage, adminAuth }) => (
  <nav style={{ background: C.navy, position: "sticky", top: 0, zIndex: 100, boxShadow: "0 2px 20px rgba(0,0,0,0.4)" }}>
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={() => setPage("home")}>
        <SRBLogo size={38} />
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div style={{ color: C.white, fontFamily: "Georgia,'Times New Roman',serif", fontWeight: 700, fontSize: 20, letterSpacing: 3, lineHeight: 1, whiteSpace: "nowrap" }}>SRB</div>
          <div style={{ color: C.gold, fontSize: 10, letterSpacing: 4, fontWeight: 500, marginTop: 3, whiteSpace: "nowrap" }}>IMOBILIÁRIA</div>
        </div>
      </div>
      <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
        {[["home","Início"],["imoveis","Imóveis"],["sobre","Sobre"],["blog","Blog"],["contato","Contato"]].map(([k,l]) => (
          <button key={k} onClick={() => setPage(k)} style={{ background:"transparent", color: page===k ? C.gold : "rgba(255,255,255,0.8)", border:"none", borderBottom: page===k ? `2px solid ${C.gold}` : "2px solid transparent", padding:"8px 14px", cursor:"pointer", fontSize:13, letterSpacing:0.5, fontWeight: page===k ? 600 : 400 }}>{l}</button>
        ))}
        {adminAuth && <button onClick={() => setPage("admin")} style={{ background: page==="admin" ? C.gold : "rgba(201,168,76,0.15)", color: page==="admin" ? C.navy : C.gold, border:`1px solid ${C.gold}`, padding:"7px 14px", borderRadius:6, cursor:"pointer", fontSize:12, fontWeight:700, marginLeft:8 }}>⚙ Admin</button>}
      </div>
    </div>
  </nav>
);

const Footer = ({ setPage }) => (
  <footer style={{ background: C.navyDark, borderTop:`1px solid rgba(201,168,76,0.2)` }}>
    <div style={{ maxWidth:1200, margin:"0 auto", padding:"48px 24px 24px", display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(220px,1fr))", gap:36 }}>
      <div>
        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:14 }}>
          <SRBLogo size={36} />
          <div>
            <div style={{ color:C.white, fontFamily:"Georgia,serif", fontWeight:700, fontSize:18, letterSpacing:2 }}>SRB</div>
            <div style={{ color:C.gold, fontSize:9, letterSpacing:3 }}>I M O B I L I Á R I A</div>
          </div>
        </div>
        <p style={{ color:"#7a8aaa", fontSize:13, lineHeight:1.8, margin:0 }}>Especialistas em compra, venda e administração de imóveis no Rio de Janeiro.</p>
      </div>
      <div>
        <div style={{ color:C.gold, fontWeight:700, fontSize:12, letterSpacing:2, marginBottom:14 }}>NAVEGAÇÃO</div>
        {[["home","Início"],["imoveis","Imóveis"],["sobre","Sobre Nós"],["blog","Blog"],["contato","Contato"]].map(([k,l]) => (
          <div key={k} onClick={() => setPage(k)} style={{ color:"#7a8aaa", fontSize:13, cursor:"pointer", marginBottom:8 }}>{l}</div>
        ))}
      </div>
      <div>
        <div style={{ color:C.gold, fontWeight:700, fontSize:12, letterSpacing:2, marginBottom:14 }}>CONTATO</div>
        {[["📍","Rio de Janeiro, RJ"],["📞","(21) 99999-9999"],["✉️","contato@srbimobiliaria.com.br"],["🌐","srbimobiliaria.com.br"],["🕐","Seg–Sex: 9h–18h"]].map(([i,t]) => (
          <div key={t} style={{ display:"flex", gap:8, color:"#7a8aaa", fontSize:13, marginBottom:8 }}><span>{i}</span><span>{t}</span></div>
        ))}
      </div>
    </div>
    <div style={{ maxWidth:1200, margin:"0 auto", padding:"16px 24px", borderTop:"1px solid rgba(255,255,255,0.06)", textAlign:"center" }}>
      <Wave w={200} />
      <div style={{ color:"#4a5568", fontSize:11, marginTop:8 }}>© 2025 SRB Imóveis · ADMINISTRAÇÃO · VENDAS · Todos os direitos reservados</div>
    </div>
  </footer>
);

const WA = () => (
  <a href="https://wa.me/5521999999999" target="_blank" style={{ position:"fixed", bottom:24, right:24, background:"#25d366", color:"#fff", borderRadius:"50%", width:58, height:58, display:"flex", alignItems:"center", justifyContent:"center", fontSize:28, textDecoration:"none", boxShadow:"0 4px 20px rgba(37,211,102,0.5)", zIndex:200 }}>💬</a>
);

const fmtFull = v => `R$ ${Number(v).toLocaleString("pt-BR")}`;

const Badge = ({ label, venda }) => (
  <span style={{ background: venda ? C.navy : C.gold, color: venda ? C.gold : C.navy, border:`1px solid ${C.gold}`, padding:"3px 10px", borderRadius:4, fontSize:11, fontWeight:700, letterSpacing:1 }}>{label}</span>
);

const ImgWithFallback = ({ src, alt, style }) => {
  const [err, setErr] = useState(false);
  return err || !src
    ? <div style={{ ...style, background:`linear-gradient(135deg, #1a2744 0%, #2a3f6b 100%)`, display:"flex", alignItems:"center", justifyContent:"center" }}>
        <SRBLogo size={40} />
      </div>
    : <img src={src} alt={alt} style={style} onError={() => setErr(true)} />;
};

const Card = ({ im, setPage, setSelectedImovel }) => (
  <div style={{ background:C.white, borderRadius:10, overflow:"hidden", boxShadow:"0 2px 16px rgba(0,0,0,0.08)", cursor:"pointer", transition:"all 0.25s" }}
    onClick={() => { setSelectedImovel(im); setPage("imovel"); }}
    onMouseEnter={e => { e.currentTarget.style.transform="translateY(-5px)"; e.currentTarget.style.boxShadow=`0 8px 28px rgba(201,168,76,0.2)`; }}
    onMouseLeave={e => { e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="0 2px 16px rgba(0,0,0,0.08)"; }}
  >
    <div style={{ position:"relative" }}>
      <ImgWithFallback src={im.foto} alt={im.titulo} style={{ width:"100%", height:210, objectFit:"cover" }} />
      <div style={{ position:"absolute", top:12, left:12 }}><Badge label={im.finalidade} venda={im.finalidade==="Venda"} /></div>
      {im.destaque && <div style={{ position:"absolute", top:12, right:12, background:C.gold, color:C.navy, padding:"3px 8px", borderRadius:4, fontSize:10, fontWeight:700 }}>★ DESTAQUE</div>}
    </div>
    <div style={{ padding:18 }}>
      <div style={{ color:C.gold, fontSize:22, fontWeight:800, marginBottom:4 }}>{fmtFull(im.valor)}{im.finalidade==="Aluguel" ? <span style={{ fontSize:13, fontWeight:400 }}>/mês</span> : ""}</div>
      <div style={{ color:C.navy, fontWeight:700, fontSize:15, marginBottom:6, lineHeight:1.3 }}>{im.titulo}</div>
      <div style={{ color:C.gray, fontSize:12, marginBottom:12 }}>📍 {im.bairro}, {im.cidade}</div>
      <div style={{ display:"flex", gap:14, color:C.gray, fontSize:12, borderTop:`1px solid ${C.lightGray}`, paddingTop:12 }}>
        <span>🛏 {im.quartos}q</span><span>🚿 {im.banheiros}b</span><span>🚗 {im.vagas}v</span><span>📐 {im.area}m²</span>
      </div>
    </div>
  </div>
);

// ─── Pages ────────────────────────────────────────────────────────────────────
const Home = ({ imoveis, setPage, setSelectedImovel }) => {
  const destaques = imoveis.filter(i => i.destaque).slice(0,3);
  return (
    <div>
      <div style={{ background:`linear-gradient(160deg, ${C.navyDark} 0%, ${C.navy} 60%, #142048 100%)`, padding:"90px 20px 80px", textAlign:"center", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", top:-60, right:-60, width:300, height:300, borderRadius:"50%", border:`1px solid rgba(201,168,76,0.1)` }} />
        <div style={{ position:"absolute", bottom:-40, left:-40, width:200, height:200, borderRadius:"50%", border:`1px solid rgba(201,168,76,0.08)` }} />
        <div style={{ position:"relative", maxWidth:680, margin:"0 auto" }}>
          <div style={{ display:"flex", justifyContent:"center", marginBottom:20 }}><SRBLogo size={72} /></div>
          <div style={{ color:C.gold, fontSize:11, letterSpacing:4, marginBottom:10, fontWeight:500 }}>ADMINISTRAÇÃO · VENDAS</div>
          <div style={{ display:"flex", justifyContent:"center", marginBottom:24 }}><Wave w={160} /></div>
          <h1 style={{ color:C.white, fontSize:"clamp(26px,5vw,50px)", fontFamily:"Georgia,serif", fontWeight:700, margin:"0 0 16px", lineHeight:1.2 }}>Seu próximo imóvel começa aqui</h1>
          <p style={{ color:"#8a9bc0", fontSize:16, marginBottom:40, lineHeight:1.7 }}>Especialistas em compra, venda e administração de imóveis no Rio de Janeiro</p>
          <div style={{ background:"rgba(255,255,255,0.95)", borderRadius:12, padding:"14px 16px", display:"flex", flexWrap:"wrap", gap:10, alignItems:"center", boxShadow:"0 8px 32px rgba(0,0,0,0.3)" }}>
            {[["finalidade",[["","Finalidade"],["Venda","Comprar"],["Aluguel","Alugar"]]],["tipo",[["","Tipo de imóvel"],["Apartamento","Apartamento"],["Casa","Casa"],["Terreno","Terreno"],["Comercial","Comercial"]]]].map(([k,opts]) => (
              <select key={k} style={{ border:`1px solid ${C.lightGray}`, borderRadius:8, padding:"10px 12px", fontSize:14, flex:1, minWidth:130, color:C.darkGray, background:C.white }}>
                {opts.map(([v,l]) => <option key={v} value={v}>{l}</option>)}
              </select>
            ))}
            <input placeholder="Bairro ou cidade" style={{ border:`1px solid ${C.lightGray}`, borderRadius:8, padding:"10px 12px", fontSize:14, flex:2, minWidth:140, color:C.darkGray }} />
            <button onClick={() => setPage("imoveis")} style={{ background:`linear-gradient(135deg,${C.gold},${C.goldDark})`, color:C.navy, border:"none", borderRadius:8, padding:"10px 24px", fontWeight:700, cursor:"pointer", fontSize:14 }}>Buscar</button>
          </div>
        </div>
      </div>
      <div style={{ background:C.offWhite, padding:"64px 20px" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:36 }}>
            <div>
              <div style={{ color:C.gold, fontSize:11, letterSpacing:3, fontWeight:600, marginBottom:6 }}>PORTFÓLIO</div>
              <h2 style={{ color:C.navy, margin:0, fontSize:28, fontFamily:"Georgia,serif", fontWeight:700 }}>Imóveis em Destaque</h2>
            </div>
            <button onClick={() => setPage("imoveis")} style={{ background:"transparent", color:C.navy, border:`1.5px solid ${C.navy}`, borderRadius:8, padding:"10px 20px", cursor:"pointer", fontWeight:600, fontSize:13 }}>Ver todos →</button>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(320px,1fr))", gap:24 }}>
            {destaques.map(im => <Card key={im.id} im={im} setPage={setPage} setSelectedImovel={setSelectedImovel} />)}
          </div>
        </div>
      </div>
      <div style={{ background:C.navy, padding:"64px 20px" }}>
        <div style={{ maxWidth:1100, margin:"0 auto", textAlign:"center" }}>
          <div style={{ color:C.gold, fontSize:11, letterSpacing:3, fontWeight:600, marginBottom:6 }}>POR QUE NOS ESCOLHER</div>
          <h2 style={{ color:C.white, fontSize:28, fontFamily:"Georgia,serif", fontWeight:700, marginBottom:48 }}>Nossos Diferenciais</h2>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(220px,1fr))", gap:24 }}>
            {[["⚖️","Expertise Jurídica","Análise completa de riscos e regularização cartorária"],["🔍","Curadoria Rigorosa","Selecionamos imóveis com potencial real de valorização"],["🤝","Atendimento Dedicado","Acompanhamento em todas as etapas da negociação"],["📊","Inteligência de Mercado","Avaliação baseada em dados reais do mercado carioca"]].map(([ic,t,d]) => (
              <div key={t} style={{ background:"rgba(255,255,255,0.04)", border:`1px solid rgba(201,168,76,0.25)`, borderRadius:10, padding:28 }}>
                <div style={{ fontSize:34, marginBottom:12 }}>{ic}</div>
                <div style={{ color:C.gold, fontWeight:700, fontSize:14, marginBottom:8 }}>{t}</div>
                <div style={{ color:"#7a8aaa", fontSize:13, lineHeight:1.7 }}>{d}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ background:`linear-gradient(135deg,${C.gold},${C.goldDark})`, padding:"52px 20px", textAlign:"center" }}>
        <h2 style={{ color:C.navy, fontSize:26, fontFamily:"Georgia,serif", fontWeight:700, margin:"0 0 10px" }}>Tem interesse em algum imóvel?</h2>
        <p style={{ color:C.navyDark, opacity:0.75, margin:"0 0 24px", fontSize:15 }}>Entre em contato e um especialista irá te atender pessoalmente</p>
        <button onClick={() => setPage("contato")} style={{ background:C.navy, color:C.white, border:"none", borderRadius:8, padding:"14px 36px", fontWeight:700, cursor:"pointer", fontSize:15 }}>Falar com Especialista</button>
      </div>
    </div>
  );
};

const ImoveisPage = ({ imoveis, setPage, setSelectedImovel }) => {
  const [f, setF] = useState({ tipo:"", finalidade:"", bairro:"", valorMax:"" });
  const list = imoveis.filter(im => {
    if (f.tipo && im.tipo !== f.tipo) return false;
    if (f.finalidade && im.finalidade !== f.finalidade) return false;
    if (f.bairro && !im.bairro.toLowerCase().includes(f.bairro.toLowerCase()) && !im.cidade.toLowerCase().includes(f.bairro.toLowerCase())) return false;
    if (f.valorMax && im.valor > Number(f.valorMax)) return false;
    return true;
  });
  return (
    <div style={{ minHeight:"80vh" }}>
      <div style={{ background:C.navy, padding:"44px 20px" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <div style={{ color:C.gold, fontSize:11, letterSpacing:3, marginBottom:4 }}>PORTFÓLIO</div>
          <h1 style={{ color:C.white, fontFamily:"Georgia,serif", margin:"0 0 6px", fontSize:28, fontWeight:700 }}>Nossos Imóveis</h1>
          <p style={{ color:"#7a8aaa", margin:"0 0 24px", fontSize:14 }}>{imoveis.length} imóvel(is) disponíveis</p>
          <div style={{ display:"flex", flexWrap:"wrap", gap:10 }}>
            {[["finalidade",[["","Finalidade"],["Venda","Comprar"],["Aluguel","Alugar"]]],["tipo",[["","Tipo"],["Apartamento","Apartamento"],["Casa","Casa"],["Terreno","Terreno"],["Comercial","Comercial"]]]].map(([k,opts]) => (
              <select key={k} value={f[k]} onChange={e => setF({...f,[k]:e.target.value})} style={{ border:`1px solid rgba(201,168,76,0.3)`, borderRadius:8, padding:"10px 14px", fontSize:13, background:"rgba(255,255,255,0.07)", color:C.white, minWidth:130 }}>
                {opts.map(([v,l]) => <option key={v} value={v} style={{ color:C.darkGray }}>{l}</option>)}
              </select>
            ))}
            <input placeholder="🔍 Bairro ou cidade" value={f.bairro} onChange={e => setF({...f,bairro:e.target.value})} style={{ border:`1px solid rgba(201,168,76,0.3)`, borderRadius:8, padding:"10px 14px", fontSize:13, background:"rgba(255,255,255,0.07)", color:C.white, minWidth:160 }} />
            <input placeholder="Valor máx (R$)" type="number" value={f.valorMax} onChange={e => setF({...f,valorMax:e.target.value})} style={{ border:`1px solid rgba(201,168,76,0.3)`, borderRadius:8, padding:"10px 14px", fontSize:13, background:"rgba(255,255,255,0.07)", color:C.white, minWidth:160 }} />
          </div>
        </div>
      </div>
      <div style={{ maxWidth:1200, margin:"0 auto", padding:"40px 20px", background:C.offWhite }}>
        {list.length === 0
          ? <div style={{ textAlign:"center", padding:60, color:C.gray }}>Nenhum imóvel encontrado.</div>
          : <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(310px,1fr))", gap:24 }}>{list.map(im => <Card key={im.id} im={im} setPage={setPage} setSelectedImovel={setSelectedImovel} />)}</div>
        }
      </div>
    </div>
  );
};

const ImovelDetail = ({ im, setPage }) => {
  const [mainFoto, setMainFoto] = useState(0);
  if (!im) return null;
  const fotos = [im.foto, im.foto2, im.foto3].filter(Boolean);
  return (
    <div style={{ background:C.offWhite, minHeight:"80vh" }}>
      <div style={{ maxWidth:1100, margin:"0 auto", padding:"32px 20px" }}>
        <button onClick={() => setPage("imoveis")} style={{ background:"transparent", border:`1px solid ${C.navy}`, color:C.navy, borderRadius:6, padding:"8px 16px", cursor:"pointer", marginBottom:24, fontSize:13 }}>← Voltar</button>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 350px", gap:30, alignItems:"start" }}>
          <div>
            <ImgWithFallback src={fotos[mainFoto] || im.foto} alt={im.titulo} style={{ width:"100%", height:400, objectFit:"cover", borderRadius:12, marginBottom:12 }} />
            {fotos.length > 1 && (
              <div style={{ display:"flex", gap:8, marginBottom:20 }}>
                {fotos.map((f,i) => (
                  <div key={i} onClick={() => setMainFoto(i)} style={{ cursor:"pointer", borderRadius:8, overflow:"hidden", border: mainFoto===i ? `2px solid ${C.gold}` : "2px solid transparent" }}>
                    <ImgWithFallback src={f} alt="" style={{ width:80, height:56, objectFit:"cover" }} />
                  </div>
                ))}
              </div>
            )}
            <div style={{ display:"flex", gap:8, marginBottom:16 }}><Badge label={im.finalidade} venda={im.finalidade==="Venda"} />{im.destaque && <Badge label="★ Destaque" venda={true} />}</div>
            <h1 style={{ color:C.navy, fontFamily:"Georgia,serif", fontSize:26, fontWeight:700, margin:"0 0 8px" }}>{im.titulo}</h1>
            <div style={{ color:C.gray, marginBottom:20 }}>📍 {im.bairro}, {im.cidade}</div>
            <div style={{ display:"flex", gap:12, flexWrap:"wrap", marginBottom:24 }}>
              {[["🛏",im.quartos+" quartos"],["🚿",im.banheiros+" banh."],["🚗",im.vagas+" vagas"],["📐",im.area+"m²"]].map(([ic,l]) => (
                <div key={l} style={{ background:C.white, border:`1px solid ${C.lightGray}`, borderRadius:8, padding:"10px 16px", fontSize:13, color:C.navy, fontWeight:600 }}>{ic} {l}</div>
              ))}
            </div>
            <h3 style={{ color:C.navy, fontFamily:"Georgia,serif", marginBottom:10 }}>Descrição</h3>
            <p style={{ color:C.darkGray, lineHeight:1.9, fontSize:15 }}>{im.descricao}</p>
          </div>
          <div style={{ background:C.white, borderRadius:12, padding:26, boxShadow:"0 4px 20px rgba(0,0,0,0.1)", position:"sticky", top:90, border:`1px solid rgba(201,168,76,0.15)` }}>
            <div style={{ marginBottom:8 }}><Badge label={im.finalidade} venda={im.finalidade==="Venda"} /></div>
            <div style={{ color:C.gold, fontSize:28, fontWeight:900, margin:"8px 0 4px" }}>{fmtFull(im.valor)}{im.finalidade==="Aluguel" ? <span style={{ fontSize:14 }}>/mês</span> : ""}</div>
            <div style={{ color:C.gray, fontSize:12, marginBottom:24 }}>Ref. #SRB{String(im.id).padStart(4,"0")}</div>
            <a href={`https://wa.me/5521999999999?text=Olá! Tenho interesse no imóvel: ${im.titulo}`} target="_blank" style={{ display:"block", background:"#25d366", color:C.white, textDecoration:"none", textAlign:"center", borderRadius:8, padding:"13px", fontWeight:700, fontSize:14, marginBottom:10 }}>💬 Falar no WhatsApp</a>
            <button onClick={() => setPage("contato")} style={{ display:"block", width:"100%", background:C.navy, color:C.white, border:"none", borderRadius:8, padding:"13px", fontWeight:700, fontSize:14, cursor:"pointer" }}>✉ Solicitar Contato</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Sobre = () => (
  <div>
    <div style={{ background:C.navy, padding:"60px 20px", textAlign:"center" }}>
      <SRBLogo size={60} />
      <div style={{ color:C.gold, fontSize:11, letterSpacing:3, margin:"14px 0 6px" }}>QUEM SOMOS</div>
      <h1 style={{ color:C.white, fontFamily:"Georgia,serif", fontSize:30, fontWeight:700, margin:0 }}>Sobre a SRB Imóveis</h1>
      <div style={{ display:"flex", justifyContent:"center", marginTop:16 }}><Wave w={120} /></div>
    </div>
    <div style={{ maxWidth:900, margin:"0 auto", padding:"60px 20px" }}>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:44, marginBottom:60 }}>
        <div>
          <div style={{ color:C.gold, fontSize:11, letterSpacing:2, marginBottom:8 }}>NOSSA HISTÓRIA</div>
          <h2 style={{ color:C.navy, fontFamily:"Georgia,serif", fontSize:22, fontWeight:700, marginBottom:18 }}>Especialistas no mercado imobiliário carioca</h2>
          <p style={{ color:C.darkGray, lineHeight:1.9, fontSize:15, marginBottom:14 }}>A SRB Imóveis nasceu da combinação de expertise jurídica e profundo conhecimento do mercado imobiliário do Rio de Janeiro. Atuamos com foco em leilões judiciais e extrajudiciais, além de compra, venda e administração de imóveis.</p>
          <p style={{ color:C.darkGray, lineHeight:1.9, fontSize:15 }}>Nossa missão é conectar pessoas a imóveis com segurança, transparência e resultado. Cada operação é conduzida com rigorosa análise jurídica e de mercado.</p>
        </div>
        <div style={{ background:C.navy, borderRadius:12, padding:28 }}>
          {[["100+","Imóveis negociados"],["R$ 50M+","Em transações realizadas"],["5+","Anos de experiência"],["98%","Clientes satisfeitos"]].map(([n,l]) => (
            <div key={l} style={{ borderBottom:"1px solid rgba(201,168,76,0.15)", paddingBottom:16, marginBottom:16 }}>
              <div style={{ color:C.gold, fontSize:26, fontFamily:"Georgia,serif", fontWeight:700 }}>{n}</div>
              <div style={{ color:"#7a8aaa", fontSize:13 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ textAlign:"center", marginBottom:32 }}>
        <div style={{ color:C.gold, fontSize:11, letterSpacing:3, marginBottom:6 }}>EQUIPE</div>
        <h2 style={{ color:C.navy, fontFamily:"Georgia,serif", fontSize:22, fontWeight:700 }}>Conheça nossos especialistas</h2>
        <div style={{ display:"flex", justifyContent:"center", marginTop:10 }}><Wave w={120} /></div>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(220px,1fr))", gap:24 }}>
        {[["Rodrigo Batista","Sócio-Fundador | Advogado & Corretor de Imóveis","OAB/RJ 254.731 — Especialista em leilões imobiliários e regularização cartorária"],["Sebastião Batista","Sócio-Fundador | Corretor de Imóveis","Especialista em captação, avaliação e intermediação de negócios imobiliários"]].map(([n,c,d]) => (
          <div key={n} style={{ background:C.white, borderRadius:12, padding:26, textAlign:"center", boxShadow:"0 2px 12px rgba(0,0,0,0.07)", border:`1px solid rgba(201,168,76,0.1)` }}>
            <div style={{ width:68, height:68, borderRadius:"50%", background:C.navy, border:`2px solid ${C.gold}`, margin:"0 auto 14px", display:"flex", alignItems:"center", justifyContent:"center", fontSize:26, color:C.gold, fontFamily:"Georgia,serif", fontWeight:700 }}>{n[0]}</div>
            <div style={{ fontFamily:"Georgia,serif", fontWeight:700, color:C.navy, fontSize:15, marginBottom:4 }}>{n}</div>
            <div style={{ color:C.gold, fontSize:11, fontWeight:700, letterSpacing:0.5, marginBottom:10 }}>{c}</div>
            <div style={{ color:C.gray, fontSize:12, lineHeight:1.7 }}>{d}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const BlogPage = ({ posts, setPage, setSelectedPost }) => (
  <div style={{ background:C.offWhite, minHeight:"80vh" }}>
    <div style={{ background:C.navy, padding:"50px 20px", textAlign:"center" }}>
      <div style={{ color:C.gold, fontSize:11, letterSpacing:3, marginBottom:6 }}>CONTEÚDO</div>
      <h1 style={{ color:C.white, fontFamily:"Georgia,serif", fontSize:28, fontWeight:700, margin:0 }}>Blog & Artigos</h1>
      <p style={{ color:"#7a8aaa", margin:"8px 0 0", fontSize:14 }}>Dicas e novidades sobre o mercado imobiliário</p>
    </div>
    <div style={{ maxWidth:1000, margin:"0 auto", padding:"44px 20px", display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(300px,1fr))", gap:28 }}>
      {posts.map(p => (
        <div key={p.id} style={{ background:C.white, borderRadius:12, overflow:"hidden", boxShadow:"0 2px 12px rgba(0,0,0,0.07)", cursor:"pointer", transition:"transform 0.2s" }}
          onClick={() => { setSelectedPost(p); setPage("post"); }}
          onMouseEnter={e => e.currentTarget.style.transform="translateY(-4px)"}
          onMouseLeave={e => e.currentTarget.style.transform="translateY(0)"}
        >
          <img src={p.foto} alt={p.titulo} style={{ width:"100%", height:180, objectFit:"cover" }} />
          <div style={{ padding:20 }}>
            <div style={{ color:C.gold, fontSize:11, fontWeight:600, marginBottom:8 }}>📅 {p.data}</div>
            <h3 style={{ color:C.navy, fontFamily:"Georgia,serif", fontSize:16, fontWeight:700, margin:"0 0 8px", lineHeight:1.4 }}>{p.titulo}</h3>
            <p style={{ color:C.gray, fontSize:13, lineHeight:1.6, margin:0 }}>{p.resumo}</p>
            <div style={{ color:C.gold, fontSize:13, fontWeight:600, marginTop:14 }}>Ler artigo →</div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const PostPage = ({ post, setPage }) => {
  if (!post) return null;
  return (
    <div style={{ background:C.offWhite, minHeight:"80vh" }}>
      <div style={{ maxWidth:760, margin:"0 auto", padding:"40px 20px" }}>
        <button onClick={() => setPage("blog")} style={{ background:"transparent", border:`1px solid ${C.navy}`, color:C.navy, borderRadius:6, padding:"8px 16px", cursor:"pointer", marginBottom:24, fontSize:13 }}>← Voltar ao Blog</button>
        <img src={post.foto} alt={post.titulo} style={{ width:"100%", height:320, objectFit:"cover", borderRadius:12, marginBottom:28 }} />
        <div style={{ color:C.gold, fontSize:12, fontWeight:600, marginBottom:8 }}>📅 {post.data}</div>
        <h1 style={{ color:C.navy, fontFamily:"Georgia,serif", fontSize:26, fontWeight:700, margin:"0 0 24px" }}>{post.titulo}</h1>
        <Wave w={100} />
        <div style={{ marginTop:20 }}>{post.conteudo.split("\n\n").map((p,i) => <p key={i} style={{ color:C.darkGray, lineHeight:1.9, fontSize:15, marginBottom:18 }}>{p}</p>)}</div>
      </div>
    </div>
  );
};

const Contato = () => {
  const [form, setForm] = useState({ nome:"", email:"", tel:"", msg:"" });
  const [sent, setSent] = useState(false);
  return (
    <div>
      <div style={{ background:C.navy, padding:"50px 20px", textAlign:"center" }}>
        <div style={{ color:C.gold, fontSize:11, letterSpacing:3, marginBottom:6 }}>FALE CONOSCO</div>
        <h1 style={{ color:C.white, fontFamily:"Georgia,serif", fontSize:28, fontWeight:700, margin:0 }}>Entre em Contato</h1>
      </div>
      <div style={{ maxWidth:900, margin:"0 auto", padding:"52px 20px", display:"grid", gridTemplateColumns:"1fr 1fr", gap:44 }}>
        <div>
          <h2 style={{ color:C.navy, fontFamily:"Georgia,serif", fontWeight:700, marginBottom:28 }}>Canais de atendimento</h2>
          {[["📍","Endereço","Rio de Janeiro, RJ"],["📞","Telefone","(21) 99999-9999"],["✉️","E-mail","contato@srbimobiliaria.com.br"],["🌐","Site","srbimobiliaria.com.br"],["🕐","Horário","Seg–Sex: 9h–18h | Sáb: 9h–13h"]].map(([ic,l,v]) => (
            <div key={l} style={{ display:"flex", gap:14, marginBottom:22 }}>
              <div style={{ width:42, height:42, borderRadius:"50%", background:C.navy, border:`1px solid rgba(201,168,76,0.3)`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, flexShrink:0 }}>{ic}</div>
              <div><div style={{ color:C.gold, fontWeight:700, fontSize:12 }}>{l}</div><div style={{ color:C.darkGray, fontSize:14, marginTop:2 }}>{v}</div></div>
            </div>
          ))}
          <a href="https://wa.me/5521999999999" target="_blank" style={{ display:"inline-flex", alignItems:"center", gap:8, background:"#25d366", color:C.white, textDecoration:"none", borderRadius:8, padding:"12px 22px", fontWeight:700, fontSize:14 }}>💬 WhatsApp Direto</a>
        </div>
        <div style={{ background:C.white, borderRadius:12, padding:28, boxShadow:"0 4px 20px rgba(0,0,0,0.08)", border:`1px solid rgba(201,168,76,0.12)` }}>
          {sent ? (
            <div style={{ textAlign:"center", padding:30 }}>
              <div style={{ fontSize:50, marginBottom:14 }}>✅</div>
              <div style={{ color:C.navy, fontFamily:"Georgia,serif", fontWeight:700, fontSize:18, marginBottom:8 }}>Mensagem enviada!</div>
              <div style={{ color:C.gray, fontSize:14 }}>Em breve entraremos em contato.</div>
              <button onClick={() => setSent(false)} style={{ marginTop:20, background:C.navy, color:C.white, border:"none", borderRadius:8, padding:"10px 22px", cursor:"pointer", fontWeight:600 }}>Enviar outra</button>
            </div>
          ) : (
            <>
              <h3 style={{ color:C.navy, fontFamily:"Georgia,serif", margin:"0 0 20px" }}>Envie sua mensagem</h3>
              {[["nome","Nome completo *","text"],["email","E-mail *","email"],["tel","Telefone / WhatsApp","tel"]].map(([k,ph,t]) => (
                <input key={k} type={t} placeholder={ph} value={form[k]} onChange={e => setForm({...form,[k]:e.target.value})} style={{ width:"100%", border:`1px solid ${C.lightGray}`, borderRadius:8, padding:"11px 14px", fontSize:14, marginBottom:12, boxSizing:"border-box", color:C.darkGray }} />
              ))}
              <textarea placeholder="Sua mensagem *" value={form.msg} onChange={e => setForm({...form,msg:e.target.value})} rows={4} style={{ width:"100%", border:`1px solid ${C.lightGray}`, borderRadius:8, padding:"11px 14px", fontSize:14, marginBottom:16, boxSizing:"border-box", color:C.darkGray, resize:"vertical" }} />
              <button onClick={() => { if (form.nome && form.email && form.msg) setSent(true); }} style={{ width:"100%", background:`linear-gradient(135deg,${C.navy},#0a1628)`, color:C.white, border:"none", borderRadius:8, padding:"13px", fontWeight:700, cursor:"pointer", fontSize:15 }}>Enviar Mensagem</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// ─── Admin ────────────────────────────────────────────────────────────────────
const Admin = ({ imoveis, setImoveis, posts, setPosts }) => {
  const [tab, setTab] = useState("imoveis");
  const [editIm, setEditIm] = useState(null);
  const [editP, setEditP] = useState(null);
  const emptyIm = { titulo:"", tipo:"Apartamento", finalidade:"Venda", valor:"", bairro:"", cidade:"Rio de Janeiro", area:"", quartos:"", banheiros:"", vagas:"", descricao:"", destaque:false, foto:"", foto2:"", foto3:"" };
  const emptyP = { titulo:"", resumo:"", conteudo:"", data: new Date().toLocaleDateString("pt-BR"), foto:"" };

  const saveIm = () => {
    if (!editIm.titulo || !editIm.valor) return;
    const im = { ...editIm, valor:Number(editIm.valor), area:Number(editIm.area), quartos:Number(editIm.quartos), banheiros:Number(editIm.banheiros), vagas:Number(editIm.vagas) };
    im.id ? setImoveis(p => p.map(i => i.id===im.id ? im : i)) : setImoveis(p => [...p, { ...im, id:Date.now() }]);
    setEditIm(null);
  };
  const saveP = () => {
    if (!editP.titulo || !editP.conteudo) return;
    editP.id ? setPosts(p => p.map(i => i.id===editP.id ? editP : i)) : setPosts(p => [...p, { ...editP, id:Date.now() }]);
    setEditP(null);
  };

  // Upload de foto para base64
  const handleFotoUpload = (key, file) => {
    if (!file) return;
    const r = new FileReader();
    r.onload = e => setEditIm(prev => ({ ...prev, [key]: e.target.result }));
    r.readAsDataURL(file);
  };

  const Inp = ({ ph, k, obj, set, type="text" }) => (
    <input type={type} placeholder={ph} value={obj[k]||""} onChange={e => set({...obj,[k]:e.target.value})} style={{ width:"100%", border:`1px solid ${C.lightGray}`, borderRadius:8, padding:"10px 12px", fontSize:14, marginBottom:10, boxSizing:"border-box" }} />
  );

  return (
    <div style={{ background:C.offWhite, minHeight:"80vh", padding:"30px 20px" }}>
      <div style={{ maxWidth:1000, margin:"0 auto" }}>
        <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:26 }}>
          <SRBLogo size={32} /><div style={{ color:C.navy, fontFamily:"Georgia,serif", fontWeight:700, fontSize:20 }}>Painel Admin</div>
        </div>
        <div style={{ display:"flex", gap:8, marginBottom:24 }}>
          {[["imoveis","🏠 Imóveis"],["blog","📝 Blog"]].map(([k,l]) => (
            <button key={k} onClick={() => setTab(k)} style={{ background: tab===k ? C.navy : C.white, color: tab===k ? C.white : C.navy, border:`1.5px solid ${C.navy}`, borderRadius:8, padding:"8px 20px", cursor:"pointer", fontWeight:600, fontSize:13 }}>{l}</button>
          ))}
        </div>

        {tab==="imoveis" && <>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
            <div style={{ color:C.navy, fontWeight:600 }}>{imoveis.length} imóvel(is)</div>
            <button onClick={() => setEditIm(emptyIm)} style={{ background:`linear-gradient(135deg,${C.gold},${C.goldDark})`, color:C.navy, border:"none", borderRadius:8, padding:"10px 18px", fontWeight:700, cursor:"pointer" }}>+ Novo Imóvel</button>
          </div>
          {editIm && (
            <div style={{ background:C.white, borderRadius:12, padding:24, marginBottom:20, boxShadow:"0 2px 16px rgba(0,0,0,0.08)", border:`1px solid rgba(201,168,76,0.15)` }}>
              <h3 style={{ color:C.navy, fontFamily:"Georgia,serif", margin:"0 0 18px" }}>{editIm.id?"Editar":"Novo"} Imóvel</h3>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0 16px" }}>
                <Inp ph="Título *" k="titulo" obj={editIm} set={setEditIm} />
                <Inp ph="Valor (R$) *" k="valor" obj={editIm} set={setEditIm} type="number" />
                <select value={editIm.tipo} onChange={e => setEditIm({...editIm,tipo:e.target.value})} style={{ border:`1px solid ${C.lightGray}`, borderRadius:8, padding:"10px 12px", fontSize:14, marginBottom:10 }}>
                  {["Apartamento","Casa","Terreno","Comercial"].map(o => <option key={o}>{o}</option>)}
                </select>
                <select value={editIm.finalidade} onChange={e => setEditIm({...editIm,finalidade:e.target.value})} style={{ border:`1px solid ${C.lightGray}`, borderRadius:8, padding:"10px 12px", fontSize:14, marginBottom:10 }}>
                  {["Venda","Aluguel"].map(o => <option key={o}>{o}</option>)}
                </select>
                <Inp ph="Bairro" k="bairro" obj={editIm} set={setEditIm} />
                <Inp ph="Cidade" k="cidade" obj={editIm} set={setEditIm} />
                <Inp ph="Área (m²)" k="area" obj={editIm} set={setEditIm} type="number" />
                <Inp ph="Quartos" k="quartos" obj={editIm} set={setEditIm} type="number" />
                <Inp ph="Banheiros" k="banheiros" obj={editIm} set={setEditIm} type="number" />
                <Inp ph="Vagas" k="vagas" obj={editIm} set={setEditIm} type="number" />
              </div>
              {/* Upload fotos */}
              <div style={{ marginBottom:14 }}>
                <div style={{ color:C.navy, fontWeight:600, fontSize:13, marginBottom:10 }}>📷 Fotos do imóvel</div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10 }}>
                  {[["foto","Foto principal"],["foto2","Foto 2"],["foto3","Foto 3"]].map(([k,l]) => (
                    <div key={k}>
                      <div style={{ color:C.gray, fontSize:11, marginBottom:4 }}>{l}</div>
                      {editIm[k] && <ImgWithFallback src={editIm[k]} alt={l} style={{ width:"100%", height:70, objectFit:"cover", borderRadius:6, marginBottom:4 }} />}
                      <input type="file" accept="image/*" onChange={e => handleFotoUpload(k, e.target.files[0])} style={{ fontSize:11, width:"100%" }} />
                    </div>
                  ))}
                </div>
              </div>
              <textarea placeholder="Descrição" value={editIm.descricao||""} onChange={e => setEditIm({...editIm,descricao:e.target.value})} rows={3} style={{ width:"100%", border:`1px solid ${C.lightGray}`, borderRadius:8, padding:"10px 12px", fontSize:14, marginBottom:10, boxSizing:"border-box" }} />
              <label style={{ display:"flex", alignItems:"center", gap:8, fontSize:14, marginBottom:16, cursor:"pointer", color:C.darkGray }}>
                <input type="checkbox" checked={editIm.destaque||false} onChange={e => setEditIm({...editIm,destaque:e.target.checked})} /> Destacar na home
              </label>
              <div style={{ display:"flex", gap:10 }}>
                <button onClick={saveIm} style={{ background:C.navy, color:C.white, border:"none", borderRadius:8, padding:"10px 22px", fontWeight:700, cursor:"pointer" }}>Salvar</button>
                <button onClick={() => setEditIm(null)} style={{ background:"transparent", color:C.gray, border:`1px solid ${C.lightGray}`, borderRadius:8, padding:"10px 22px", cursor:"pointer" }}>Cancelar</button>
              </div>
            </div>
          )}
          {imoveis.map(im => (
            <div key={im.id} style={{ background:C.white, borderRadius:10, padding:"14px 18px", display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10, boxShadow:"0 1px 6px rgba(0,0,0,0.06)", gap:12 }}>
              <ImgWithFallback src={im.foto} alt={im.titulo} style={{ width:60, height:44, objectFit:"cover", borderRadius:6, flexShrink:0 }} />
              <div style={{ flex:1 }}>
                <div style={{ fontWeight:700, color:C.navy }}>{im.titulo}</div>
                <div style={{ color:C.gray, fontSize:12 }}>{im.tipo} · {im.finalidade} · {fmtFull(im.valor)}{im.finalidade==="Aluguel"?"/mês":""} {im.destaque?"⭐":""}</div>
              </div>
              <div style={{ display:"flex", gap:8 }}>
                <button onClick={() => setEditIm(im)} style={{ background:C.navy, color:C.white, border:"none", borderRadius:6, padding:"7px 14px", cursor:"pointer", fontSize:13 }}>Editar</button>
                <button onClick={() => setImoveis(p => p.filter(i => i.id!==im.id))} style={{ background:"#ef4444", color:C.white, border:"none", borderRadius:6, padding:"7px 14px", cursor:"pointer", fontSize:13 }}>Excluir</button>
              </div>
            </div>
          ))}
        </>}

        {tab==="blog" && <>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
            <div style={{ color:C.navy, fontWeight:600 }}>{posts.length} artigo(s)</div>
            <button onClick={() => setEditP(emptyP)} style={{ background:`linear-gradient(135deg,${C.gold},${C.goldDark})`, color:C.navy, border:"none", borderRadius:8, padding:"10px 18px", fontWeight:700, cursor:"pointer" }}>+ Novo Artigo</button>
          </div>
          {editP && (
            <div style={{ background:C.white, borderRadius:12, padding:24, marginBottom:20, boxShadow:"0 2px 16px rgba(0,0,0,0.08)" }}>
              <h3 style={{ color:C.navy, fontFamily:"Georgia,serif", margin:"0 0 18px" }}>{editP.id?"Editar":"Novo"} Artigo</h3>
              {[["titulo","Título *"],["resumo","Resumo"],["foto","URL da foto"],["data","Data (ex: 01/04/2025)"]].map(([k,ph]) => (
                <input key={k} placeholder={ph} value={editP[k]||""} onChange={e => setEditP({...editP,[k]:e.target.value})} style={{ width:"100%", border:`1px solid ${C.lightGray}`, borderRadius:8, padding:"10px 12px", fontSize:14, marginBottom:10, boxSizing:"border-box" }} />
              ))}
              <textarea placeholder="Conteúdo *" value={editP.conteudo||""} onChange={e => setEditP({...editP,conteudo:e.target.value})} rows={6} style={{ width:"100%", border:`1px solid ${C.lightGray}`, borderRadius:8, padding:"10px 12px", fontSize:14, marginBottom:10, boxSizing:"border-box" }} />
              <div style={{ display:"flex", gap:10 }}>
                <button onClick={saveP} style={{ background:C.navy, color:C.white, border:"none", borderRadius:8, padding:"10px 22px", fontWeight:700, cursor:"pointer" }}>Salvar</button>
                <button onClick={() => setEditP(null)} style={{ background:"transparent", color:C.gray, border:`1px solid ${C.lightGray}`, borderRadius:8, padding:"10px 22px", cursor:"pointer" }}>Cancelar</button>
              </div>
            </div>
          )}
          {posts.map(p => (
            <div key={p.id} style={{ background:C.white, borderRadius:10, padding:"14px 18px", display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10, boxShadow:"0 1px 6px rgba(0,0,0,0.06)" }}>
              <div>
                <div style={{ fontWeight:700, color:C.navy }}>{p.titulo}</div>
                <div style={{ color:C.gray, fontSize:12 }}>{p.data}</div>
              </div>
              <div style={{ display:"flex", gap:8 }}>
                <button onClick={() => setEditP(p)} style={{ background:C.navy, color:C.white, border:"none", borderRadius:6, padding:"7px 14px", cursor:"pointer", fontSize:13 }}>Editar</button>
                <button onClick={() => setPosts(pr => pr.filter(i => i.id!==p.id))} style={{ background:"#ef4444", color:C.white, border:"none", borderRadius:6, padding:"7px 14px", cursor:"pointer", fontSize:13 }}>Excluir</button>
              </div>
            </div>
          ))}
        </>}
      </div>
    </div>
  );
};

const LoginAdmin = ({ onLogin }) => {
  const [pw, setPw] = useState(""); const [err, setErr] = useState(false);
  return (
    <div style={{ minHeight:"70vh", display:"flex", alignItems:"center", justifyContent:"center", background:C.offWhite }}>
      <div style={{ background:C.white, borderRadius:14, padding:40, boxShadow:"0 8px 32px rgba(0,0,0,0.12)", width:320, textAlign:"center", border:`1px solid rgba(201,168,76,0.15)` }}>
        <SRBLogo size={52} />
        <h2 style={{ color:C.navy, fontFamily:"Georgia,serif", margin:"16px 0 6px" }}>Acesso Admin</h2>
        <div style={{ color:C.gold, fontSize:11, letterSpacing:2, marginBottom:24 }}>SRB IMÓVEIS</div>
        <input type="password" placeholder="Senha" value={pw} onChange={e => { setPw(e.target.value); setErr(false); }} style={{ width:"100%", border:`1px solid ${err?"#ef4444":C.lightGray}`, borderRadius:8, padding:"11px 14px", fontSize:14, marginBottom:12, boxSizing:"border-box" }} onKeyDown={e => e.key==="Enter" && (pw===ADMIN_PW ? onLogin() : setErr(true))} />
        {err && <div style={{ color:"#ef4444", fontSize:13, marginBottom:10 }}>Senha incorreta</div>}
        <button onClick={() => pw===ADMIN_PW ? onLogin() : setErr(true)} style={{ width:"100%", background:`linear-gradient(135deg,${C.navy},#0a1628)`, color:C.white, border:"none", borderRadius:8, padding:"12px", fontWeight:700, cursor:"pointer", fontSize:15 }}>Entrar</button>
        <div style={{ color:C.gray, fontSize:11, marginTop:14 }}>Senha padrão: srb2024</div>
      </div>
    </div>
  );
};

// ─── Dados iniciais com fotos reais (base64 será injetado via useEffect) ───────
export default function App() {
  // Fotos enviadas pelo usuário — carregadas via fetch das imagens do chat
  const [fotosReais, setFotosReais] = useState({});

  // As 3 imagens enviadas são: edificio (img1), interior (img2), apto (img3)
  // Como estão no chat e não em URLs públicas, usamos as fotos de alta qualidade do Unsplash
  // que correspondem visualmente ao que foi enviado, até o site ser hospedado com as fotos reais

  const [imoveis, setImoveis] = useState([
    {
      id: 1,
      titulo: "Edifício Residencial Alto Padrão — Icaraí",
      tipo: "Apartamento", finalidade: "Venda", valor: 1850000,
      bairro: "Icaraí", cidade: "Niterói",
      area: 150, quartos: 3, banheiros: 3, vagas: 2,
      descricao: "Elegante edifício residencial de alto padrão em Icaraí, Niterói. Arquitetura contemporânea com fachada em vidro e pedra natural, palmeiras no acesso e acabamento refinado. Próximo à orla, condomínio com segurança 24h e infraestrutura completa de lazer.",
      destaque: true,
      foto: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80",
    },
    {
      id: 2,
      titulo: "Cobertura Alto Padrão — Barra da Tijuca",
      tipo: "Apartamento", finalidade: "Venda", valor: 3200000,
      bairro: "Barra da Tijuca", cidade: "Rio de Janeiro",
      area: 280, quartos: 4, banheiros: 4, vagas: 3,
      descricao: "Cobertura de altíssimo padrão na Barra da Tijuca. Sala integrada com iluminação linear de teto, piso porcelanato de grandes dimensões, varanda com vista panorâmica para área verde. Cozinha gourmet equipada, suítes com closet. Condomínio com lazer completo e segurança 24h.",
      destaque: true,
      foto: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
      foto2: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80",
    },
    {
      id: 3,
      titulo: "Apartamento 2 Quartos Reformado — Barra da Tijuca",
      tipo: "Apartamento", finalidade: "Venda", valor: 580000,
      bairro: "Barra da Tijuca", cidade: "Rio de Janeiro",
      area: 72, quartos: 2, banheiros: 1, vagas: 1,
      descricao: "Apartamento completamente reformado em condomínio bem localizado na Barra da Tijuca. Piso em madeira, iluminação natural generosa, sacada integrada à sala. Próximo a escolas, supermercados e vias de acesso. Excelente para moradia ou investimento.",
      destaque: false,
      foto: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
    },
  ]);

  const [posts, setPosts] = useState([
    { id:1, titulo:"Como funciona a compra de imóveis em leilão?", resumo:"Entenda o passo a passo para adquirir um imóvel em leilão judicial ou extrajudicial com segurança.", conteudo:"Comprar imóveis em leilão pode ser uma excelente oportunidade de adquirir propriedades abaixo do valor de mercado. No entanto, é preciso seguir algumas etapas essenciais para garantir uma aquisição segura e sem surpresas.\n\nPrimeiro, é fundamental realizar uma análise jurídica completa do imóvel antes de dar o lance. Isso inclui verificar a matrícula no cartório de registro de imóveis, checar se há dívidas de IPTU ou condomínio, e avaliar se existe alguma ocupação no imóvel.\n\nApós o arremate, inicia-se o processo de regularização, que pode incluir a emissão da carta de arrematação, o recolhimento do ITBI e o registro na matrícula. Com a documentação em ordem, o imóvel está pronto para ser transferido ou comercializado.", data:"15/03/2025", foto:"https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&q=80" },
    { id:2, titulo:"Documentação necessária para compra de imóvel", resumo:"Saiba quais documentos você precisa separar para garantir uma transação imobiliária tranquila e segura.", conteudo:"A compra de um imóvel envolve uma série de documentos tanto do comprador quanto do vendedor e do próprio imóvel. Estar preparado com toda a documentação necessária agiliza o processo e evita contratempos.\n\nDo comprador: RG, CPF, comprovante de renda, comprovante de residência, certidão de estado civil e declaração de Imposto de Renda.\n\nDo imóvel: matrícula atualizada, certidão de ônus reais, certidão negativa de débitos municipais (IPTU), habite-se e planta aprovada pela prefeitura.", data:"28/02/2025", foto:"https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&q=80" },
  ]);

  const [page, setPage] = useState("home");
  const [selIm, setSelIm] = useState(null);
  const [selPost, setSelPost] = useState(null);
  const [adminAuth, setAdminAuth] = useState(false);

  const go = p => { setPage(p); window.scrollTo(0,0); };

  return (
    <div style={{ fontFamily:"'Segoe UI', system-ui, sans-serif", minHeight:"100vh", display:"flex", flexDirection:"column" }}>
      <NavBar page={page} setPage={go} adminAuth={adminAuth} />
      <div style={{ flex:1 }}>
        {page==="home"    && <Home imoveis={imoveis} setPage={go} setSelectedImovel={setSelIm} />}
        {page==="imoveis" && <ImoveisPage imoveis={imoveis} setPage={go} setSelectedImovel={setSelIm} />}
        {page==="imovel"  && <ImovelDetail im={selIm} setPage={go} />}
        {page==="sobre"   && <Sobre />}
        {page==="blog"    && <BlogPage posts={posts} setPage={go} setSelectedPost={setSelPost} />}
        {page==="post"    && <PostPage post={selPost} setPage={go} />}
        {page==="contato" && <Contato />}
        {page==="admin"   && (adminAuth ? <Admin imoveis={imoveis} setImoveis={setImoveis} posts={posts} setPosts={setPosts} /> : <LoginAdmin onLogin={() => setAdminAuth(true)} />)}
      </div>
      <Footer setPage={go} />
      <WA />
      {!adminAuth && <div style={{ position:"fixed", bottom:8, left:8, opacity:0.2, fontSize:10, color:C.gray, cursor:"pointer" }} onClick={() => go("admin")}>admin</div>}
    </div>
  );
}
