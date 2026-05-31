// Shared CSS for the character sheet, scoped under `.csheet`, so the on-screen
// InteractiveSheet and the printable HTML (utils/characterSheet.ts) look
// identical and stay in sync. Black-on-white, rounded double-border panels with
// labels at the bottom — matching the official 2014 D&D sheet.
export const SHEET_CSS = `
.csheet { color:#111; font-family: Georgia,'Times New Roman',serif; line-height:1.15; }
.csheet input,.csheet textarea,.csheet select{font-family:inherit;color:#111;background:transparent;border:none;outline:none;width:100%;padding:0;}
.csheet textarea{resize:none;}
.csheet input:focus,.csheet textarea:focus,.csheet select:focus{background:#fff7d6;}
/* portrait A4 proportions on screen (≈ 210×297) */
.csheet .cs-page{position:relative;background:#fff;border:1px solid #999;border-radius:5px;padding:20px 22px 24px;margin:0 auto 20px;width:760px;max-width:100%;min-height:1040px;}
/* decorative fantasy frame (subtle double rule + corner flourishes) */
.csheet .cs-page::before{content:"";position:absolute;inset:6px;border:1.4px solid #1f1f1f;border-radius:9px;pointer-events:none;}
.csheet .cs-page::after{content:"";position:absolute;inset:10px;border:.5px solid #1f1f1f;border-radius:6px;pointer-events:none;}
.csheet .cs-corner{position:absolute;width:30px;height:30px;color:#1f1f1f;pointer-events:none;z-index:2;}
.csheet .cs-corner svg{width:100%;height:100%;display:block;}
.csheet .cs-corner.tl{left:4px;top:4px;}
.csheet .cs-corner.tr{right:4px;top:4px;transform:scaleX(-1);}
.csheet .cs-corner.bl{left:4px;bottom:4px;transform:scaleY(-1);}
.csheet .cs-corner.br{right:4px;bottom:4px;transform:scale(-1,-1);}
.csheet .cs-pgnum{display:flex;justify-content:space-between;font-size:8px;letter-spacing:.12em;text-transform:uppercase;color:#999;border-bottom:1px solid #ddd;margin-bottom:8px;padding-bottom:2px;}

/* logo + header */
.csheet .cs-logo{font-weight:bold;font-size:15px;letter-spacing:.04em;text-align:center;border-bottom:3px double #000;padding-bottom:2px;line-height:1;}
.csheet .cs-logo small{display:block;font-size:8px;letter-spacing:.25em;font-weight:normal;}

/* panel: rounded double border, label centered at the bottom */
.csheet .cs-panel{position:relative;border:1.5px solid #000;border-radius:9px;padding:5px 7px 14px;}
.csheet .cs-panel::after{content:"";position:absolute;inset:2.5px;border:.5px solid #000;border-radius:6px;pointer-events:none;}
.csheet .cs-pl{position:absolute;left:50%;bottom:-1px;transform:translateX(-50%);font-size:7px;letter-spacing:.05em;text-transform:uppercase;background:#fff;padding:0 5px;z-index:1;white-space:nowrap;}

/* field box (label bottom) used in header */
.csheet .cs-fld{position:relative;border:1.5px solid #000;border-radius:7px;padding:3px 6px 11px;min-height:30px;display:flex;align-items:center;}
.csheet .cs-fld>.cs-pl{font-size:6.5px;}
.csheet .cs-fld input{font-size:12px;}

/* ability box */
.csheet .cs-ab{position:relative;border:1.5px solid #000;border-radius:11px;padding:4px 2px 16px;text-align:center;margin-bottom:32px;}
.csheet .cs-ab .nm{font-size:6px;text-transform:uppercase;letter-spacing:-.01em;white-space:nowrap;overflow:hidden;}
.csheet .cs-ab .md{font-size:21px;font-weight:bold;line-height:1.05;}
.csheet .cs-ab .sc{position:absolute;left:50%;bottom:-11px;transform:translateX(-50%);width:38px;height:22px;border:1.5px solid #000;border-radius:11px;background:#fff;display:flex;align-items:center;justify-content:center;}
.csheet .cs-ab .sc input{text-align:center;font-size:12px;font-weight:bold;}

/* proficiency line (saves / skills) */
.csheet .cs-line{display:flex;align-items:center;gap:5px;font-size:10.5px;line-height:1.25;padding:.7px 0;}
.csheet .cs-bub{width:10px;height:10px;border:1.2px solid #000;border-radius:50%;flex:none;cursor:pointer;background:#fff;}
.csheet .cs-bub.on{background:#000;}
.csheet .cs-mod{width:20px;text-align:center;font-weight:bold;border-bottom:1px solid #000;flex:none;}
.csheet .cs-line .nm{flex:1;}
.csheet .cs-line .sub{font-size:8px;color:#777;text-transform:uppercase;}

/* mini stat box (label bottom) */
.csheet .cs-mini{position:relative;border:1.5px solid #000;border-radius:8px;padding:2px 2px 11px;text-align:center;}
.csheet .cs-mini .v{font-size:15px;font-weight:bold;}
.csheet .cs-mini .v input{text-align:center;font-size:15px;font-weight:bold;}
.csheet .cs-mini .cs-pl{font-size:6.5px;}

/* AC shield */
.csheet .cs-shield{position:relative;width:74px;height:84px;margin:0 auto;}
.csheet .cs-shield svg{position:absolute;inset:0;width:100%;height:100%;}
.csheet .cs-shield .v{position:absolute;top:18px;left:0;right:0;text-align:center;font-size:20px;font-weight:bold;}
.csheet .cs-shield .v input{text-align:center;font-size:20px;font-weight:bold;}
.csheet .cs-shield .cs-pl{bottom:6px;}

/* small inline label */
.csheet .lbl{font-size:7px;text-transform:uppercase;letter-spacing:.04em;color:#555;}

/* attacks table */
.csheet table.cs-atk{width:100%;border-collapse:collapse;font-size:10px;}
.csheet table.cs-atk th{font-size:6.5px;text-transform:uppercase;color:#555;border-bottom:1px solid #000;padding:1px 2px;}
.csheet table.cs-atk td{border-bottom:1px solid #ccc;padding:1px 3px;}
.csheet table.cs-atk td.c{text-align:center;}

/* coins column */
.csheet .cs-coins{display:flex;flex-direction:column;gap:3px;}
.csheet .cs-coin{position:relative;border:1.2px solid #000;border-radius:5px;display:flex;align-items:center;gap:3px;padding:1px 4px;}
.csheet .cs-coin b{font-size:8px;width:16px;}
.csheet .cs-coin input{font-size:11px;}

/* death saves */
.csheet .cs-death{display:flex;align-items:center;gap:4px;font-size:9px;}
.csheet .cs-death .bubs{display:flex;gap:3px;}

.csheet .areabox{width:100%;font-size:11px;white-space:pre-line;}
.csheet textarea.areabox{min-height:100%;}

/* growing panel (fills column to page bottom) */
.csheet .cs-grow{display:flex;flex-direction:column;}
.csheet .cs-grow>.areabox,.csheet .cs-grow>.cs-growbody{flex:1;}
/* spell lines: tight, flush, clipped if they overflow the square */
.csheet .cs-fill{display:flex;flex-direction:column;height:100%;overflow:hidden;}

/* spell line: name + В С М Р К circles — tight, flush together */
.csheet .cs-spline{display:flex;align-items:center;gap:3px;border-bottom:1px solid #aaa;padding:0;line-height:1.1;}
.csheet .cs-spline input{flex:1;font-size:9.5px;padding:0;}
.csheet .cs-spline .circles{display:flex;gap:2px;}
.csheet .cs-cir{width:10px;height:10px;border:1px solid #000;border-radius:50%;font-size:5.5px;line-height:1;display:flex;align-items:center;justify-content:center;cursor:pointer;color:#666;background:#fff;}
.csheet .cs-cir.on{background:#000;color:#fff;}

/* manual attack row */
.csheet .cs-atk input{font-size:10px;border-bottom:1px solid #bbb;}
`

// Extra rules only for the printed/exported sheet (A4 pages).
export const SHEET_PRINT_CSS = `
@page{size:A4;margin:9mm;}
*{box-sizing:border-box;}
body{margin:0;background:#fff;}
.cs-page{border:none!important;margin:0!important;width:auto!important;max-width:none!important;min-height:262mm!important;height:262mm;overflow:hidden;page-break-after:always;padding:4mm!important;}
.cs-page:last-child{page-break-after:auto;}
.areabody{white-space:pre-line;}
`
