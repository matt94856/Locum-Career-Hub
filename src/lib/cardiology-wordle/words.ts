export type WordleCategory = "anatomy" | "rhythm" | "procedure" | "device" | "imaging" | "locums";

export type WordleAnswer = {
  word: string;
  category: WordleCategory;
  gloss: string;
};

function entry(word: string, category: WordleCategory, gloss: string): WordleAnswer {
  return { word: word.toUpperCase(), category, gloss };
}

/** Daily answers: cardiology-only, 4–6 letters, mostly 5. */
export const CARDIOLOGY_WORDLE_ANSWERS: WordleAnswer[] = [
  entry("STEMI", "rhythm", "ST-elevation MI. Activation rules are what move IC locum pay."),
  entry("AORTA", "anatomy", "The great vessel. Dissection and aneurysm work show up on mixed locum blocks."),
  entry("NODAL", "rhythm", "AV-nodal. EP locums live in this neighborhood."),
  entry("GRAFT", "procedure", "CABG conduit. Surgical backup still matters on STEMI call."),
  entry("SHOCK", "rhythm", "Cardiogenic shock or defibrillation — both change the week."),
  entry("SINUS", "rhythm", "Sinus rhythm. The baseline every telemetry block hopes for."),
  entry("STENT", "procedure", "Coronary stent. PCI logs are what hospitals ask for."),
  entry("VALVE", "anatomy", "Aortic, mitral, or tricuspid. Structural locums start here."),
  entry("PACER", "device", "Temporary or permanent pacemaker coverage."),
  entry("BLOCK", "rhythm", "Heart block — or a locum block. Context matters."),
  entry("BRADY", "rhythm", "Bradycardia. Night call loves this word."),
  entry("TACHY", "rhythm", "Tachycardia. SVT vs VT is the real question."),
  entry("LEADS", "device", "Pacing or ICD leads. Extraction is a smaller, higher-demand pool."),
  entry("EDEMA", "anatomy", "Pulmonary or peripheral. HF locum census in one word."),
  entry("VTACH", "rhythm", "Ventricular tachycardia. Complex EP work sits above the usual band."),
  entry("SPECT", "imaging", "Nuclear SPECT. NIC locums that interpret nukes pay differently."),
  entry("AVNRT", "rhythm", "AV-nodal reentrant tachycardia. Everyday EP lab ablation."),
  entry("HFPEF", "anatomy", "Heart failure with preserved EF. Consult-heavy general blocks."),
  entry("HFREF", "anatomy", "Heart failure with reduced EF. GDMT and devices travel together."),
  entry("PULSE", "anatomy", "The first vital. Still the first question on a crash page."),
  entry("HEART", "anatomy", "The organ. Also the whole reason this puzzle exists."),
  entry("LUMEN", "anatomy", "Vessel lumen. IVUS and OCT exist to look at it."),
  entry("SEPTA", "anatomy", "Septum, plural-ish. ASD, VSD, and HOCM live here."),
  entry("ATRIA", "anatomy", "Left and right atria. AF ablation starts in one of them."),
  entry("CHORD", "anatomy", "Chordae tendineae. Mitral repair language."),
  entry("SHUNT", "anatomy", "Intra-cardiac shunt. ACHD and structural overlap."),
  entry("WALLS", "anatomy", "Ventricular walls. WMA on echo is a locum read staple."),
  entry("APEX", "anatomy", "LV apex. Thrombus and Takotsubo live at the tip."),
  entry("MEDIA", "anatomy", "Arterial media. Dissection planes start here."),
  entry("CUSPS", "anatomy", "Valve cusps. Bicuspid aortic valve is a structural flag."),
  entry("PATCH", "procedure", "Pericardial or surgical patch. Congenital and repair cases."),
  entry("REMOD", "anatomy", "Remodeling after infarct. Why GDMT exists."),
  entry("HYPER", "anatomy", "Hypertrophy or hypertensive urgency — confirm which."),
  entry("LIPID", "anatomy", "Lipid clinic is real preventive locum work."),
  entry("NITRO", "procedure", "Nitroglycerin. Cath lab and chest-pain pathways."),
  entry("ADENO", "procedure", "Adenosine. Stress lab and SVT in one syringe."),
  entry("HEPAR", "procedure", "Heparin. ACT checks on every PCI day."),
  entry("LASIX", "procedure", "Furosemide. HF nights in one word."),
  entry("SOTAL", "procedure", "Sotalol. EP and HF share this one."),
  entry("DIGOX", "procedure", "Digoxin. Old drug, still on the list."),
  entry("DOBUT", "procedure", "Dobutamine. Stress echo or shock — different jobs."),
  entry("CARVE", "procedure", "Carvedilol. GDMT, not the cath lab."),
  entry("TICAG", "procedure", "Ticagrelor. DAPT after the stent goes in."),
  entry("CLOPI", "procedure", "Clopidogrel. Still the workhorse at many community labs."),
  entry("AMIOD", "procedure", "Amiodarone. EP and CCU both reach for it."),
  entry("QWAVE", "rhythm", "Q-wave infarct. Old anterior MI on the first ECG."),
  entry("RWAVE", "rhythm", "R-wave. Progression — or poor R-wave progression."),
  entry("TWAVE", "rhythm", "T-wave inversion. Ischemia vs memory vs strain."),
  entry("DELTA", "rhythm", "Delta wave. WPW until proven otherwise."),
  entry("STRAIN", "imaging", "LV strain. Echo labs that pay for this skill."),
  entry("WATCH", "device", "Watchman / LAA occluder. Structural-adjacent EP skill."),
  entry("ROTAB", "procedure", "Rotational atherectomy. Calcium that will not yield."),
  entry("SHIFT", "locums", "A defined locum shift. Start and stop times in writing."),
  entry("LOCUM", "locums", "Locum tenens. Temporary coverage — the whole product."),
  entry("IMLC", "locums", "Interstate Medical Licensure Compact. Faster state access."),
  entry("TAIL", "locums", "Malpractice tail. Ask before you stack employed and locum call."),
  entry("CALL", "locums", "Night or weekend call. The variable that moves a daily rate."),
  entry("TAVR", "procedure", "Transcatheter aortic valve replacement."),
  entry("CABG", "procedure", "Coronary artery bypass graft. The backup behind many STEMI labs."),
  entry("CATH", "procedure", "Cardiac catheterization. The lab IC locums are hired for."),
  entry("LVAD", "device", "Left ventricular assist device. Advanced HF programs only."),
  entry("ECMO", "device", "Extracorporeal membrane oxygenation. Shock centers."),
  entry("IABP", "device", "Intra-aortic balloon pump. MCS on a community STEMI night."),
  entry("AFIB", "rhythm", "Atrial fibrillation. The most common EP locum case mix."),
  entry("IVUS", "imaging", "Intravascular ultrasound. PCI optimization, not a toy."),
  entry("LBBB", "rhythm", "Left bundle branch block. Pacing and MI mimics."),
  entry("RBBB", "rhythm", "Right bundle branch block. Usually friendlier than LBBB."),
  entry("LIMA", "anatomy", "Left internal mammary artery. The graft surgeons protect."),
  entry("MUGA", "imaging", "MUGA scan. EF by nuclear when echo is limited."),
  entry("SICD", "device", "Subcutaneous ICD. No transvenous leads."),
  entry("AVRT", "rhythm", "AV reentrant tachycardia. Accessory pathway EP."),
  entry("LEAD", "device", "A single pacing or ICD lead. Logs still count."),
  entry("RATE", "rhythm", "Heart rate. Also a locum daily rate if you squint."),
  entry("PACE", "device", "To pace. Temporary wire or permanent generator."),
  entry("FLOW", "anatomy", "Coronary flow. TIMI 3 is the goal."),
  entry("RISK", "locums", "Risk — clinical or contract. Write both down."),
  entry("WALL", "anatomy", "Ventricular wall. Motion and rupture are different problems."),
  entry("BASE", "anatomy", "Cardiac base. Annulus and valves sit here."),
  entry("CODE", "locums", "A code blue. Confirm who runs it on a locum night."),
  entry("ACLS", "locums", "Advanced cardiac life support. Hospitals will ask."),
  entry("TIMI", "procedure", "TIMI flow grade after PCI."),
  entry("DOAC", "procedure", "Direct oral anticoagulant. AF and VTE."),
  entry("ARNI", "procedure", "ARNI therapy. Sacubitril/valsartan for HFrEF."),
  entry("LIDO", "procedure", "Lidocaine. Old VT drug, still in some carts."),
  entry("AMIO", "procedure", "Amiodarone, shortened. You will type this in a hurry."),
  entry("SCAR", "anatomy", "Infarct scar. Substrate for VT ablation."),
  entry("HYPO", "anatomy", "Hypotension or hypokinesis. Ask which."),
  entry("WAVE", "rhythm", "P, QRS, T. The whole ECG language."),
  entry("RING", "procedure", "Annuloplasty ring. Mitral repair hardware."),
  entry("NSTEMI", "rhythm", "Non-ST-elevation MI. Different activation than STEMI."),
  entry("RHYTHM", "rhythm", "The thing EP locums get paid to fix."),
  entry("MURMUR", "anatomy", "Listen first. Structural and clinic locums still do this."),
  entry("PLAQUE", "anatomy", "Atherosclerotic plaque. The reason stents exist."),
  entry("BYPASS", "procedure", "Surgical bypass. Know when the lab is not enough."),
  entry("ABLATE", "procedure", "To ablate. AF, SVT, or VT — confirm the mix."),
  entry("STRESS", "imaging", "Stress test. Supervise or interpret — NIC pay moves on this."),
  entry("ARREST", "rhythm", "Cardiac arrest. Write the code role into the contract."),
  entry("LESION", "anatomy", "Coronary lesion. Syntax and complexity live here."),
  entry("MITRAL", "anatomy", "Mitral valve. Repair, replace, or TEER."),
  entry("AORTIC", "anatomy", "Aortic valve or root. TAVR vs surgery."),
  entry("DEVICE", "device", "PPM, ICD, CRT, or LAA. EP clinic days."),
  entry("OUTPUT", "anatomy", "Cardiac output. Shock math."),
  entry("STROKE", "anatomy", "Cardioembolic stroke. AF and LAA conversations."),
  entry("TAMPON", "anatomy", "Tamponade. Echo and a needle, fast."),
  entry("ACCESS", "procedure", "Vascular access. Radial vs femoral still starts the case."),
  entry("EMBOLI", "anatomy", "Emboli. PE, limb, or brain — different teams."),
  entry("THROMB", "anatomy", "Thrombus. Lysis, thrombectomy, or anticoagulate."),
  entry("TRAVEL", "locums", "Travel locums. Airports plus a written call schedule."),
  entry("BRIDGE", "locums", "A locum bridge between jobs — or Impella as a bridge."),
  entry("PRESS", "anatomy", "Blood pressure. The first number on every overnight note."),
  entry("BEATS", "rhythm", "Ectopic beats. PVCs that keep the pager busy."),
  entry("PAUSE", "rhythm", "A sinus pause. How long before someone calls EP?"),
  entry("FLUID", "anatomy", "Volume status. HF locums live in this argument."),
  entry("VITAL", "anatomy", "Vitals. Still the first look on a new consult."),
  entry("CHEST", "anatomy", "Chest pain. The consult that starts the night."),
  entry("WIRES", "device", "Pacing wires or coronary wires. Confirm which lab."),
  entry("PROBE", "imaging", "Echo probe. On-site vs cart-to-cart matters."),
  entry("TROPS", "procedure", "Troponins. Serial enzymes, not a single draw."),
  entry("PAGER", "locums", "The pager. Write what hours are already in the daily number."),
  entry("NIGHT", "locums", "Night coverage. Callback after the included hours."),
  entry("BOARD", "locums", "Board status. Hospitals will ask before privileging."),
  entry("DAILY", "locums", "A daily guarantee. Not a posted salary."),
  entry("GROSS", "locums", "Gross locum pay. Taxes and tail still sit outside it."),
  entry("SCOPE", "locums", "Written scope. STEMI, TEE, or clinic — get it in writing."),
  entry("SKILL", "locums", "The skill mix that moves a pay range."),
  entry("OSTIA", "anatomy", "Coronary ostia. Left main and RCA takeoff."),
  entry("RAMUS", "anatomy", "Ramus intermedius. The extra coronary branch."),
  entry("CORON", "anatomy", "Coronary, shortened. Still the territory."),
  entry("INFAR", "anatomy", "Infarct territory. Old Q waves vs new injury."),
  entry("ACUTE", "rhythm", "Acute coronary syndrome until you prove it is not."),
  entry("CRASH", "locums", "Crash cart or crash page. Confirm who runs the code."),
  entry("WEDGE", "anatomy", "Wedge pressure. The number a PA catheter is for."),
  entry("INDEX", "anatomy", "Cardiac index. Shock math per body surface area."),
  entry("RATIO", "anatomy", "Aortic valve area ratio — or a pay ratio. Context."),
  entry("TRACE", "imaging", "The ECG or pressure trace. Read it yourself."),
  entry("STRIP", "rhythm", "Telemetry strip. The thing they text you at 2 a.m."),
  entry("CATHS", "procedure", "Caths. Diagnostic vs PCI — different privileges."),
  entry("DRILL", "procedure", "Atherectomy drill. Calcium that will not yield."),
  entry("ASPIR", "procedure", "Aspiration thrombectomy or aspirin. Context."),
  entry("LYSIS", "procedure", "Thrombolysis. When the lab is too far."),
  entry("ANGIO", "procedure", "Angiogram. Pictures before the intervention."),
  entry("FEMOR", "procedure", "Femoral access. Still the bailout when radial fails."),
  entry("ULNAR", "procedure", "Ulnar access. The other wrist when radial is spent."),
  entry("PEDAL", "anatomy", "Pedal pulses. After a groin stick, check them."),
  entry("GROIN", "procedure", "Access site. Hematoma risk lives here."),
  entry("WRIST", "procedure", "Radial lounge. Same-day PCI when it works."),
  entry("CLOSE", "procedure", "Closure device. Angio-Seal, Perclose, or hold."),
  entry("FAINT", "rhythm", "Syncope. Admit, observe, or send home."),
  entry("BRUIT", "anatomy", "Carotid or fistula bruit. Listen before you image."),
  entry("HEAVE", "anatomy", "A parasternal heave. RV pressure you can feel."),
  entry("RALES", "anatomy", "Pulmonary rales. HF until the chest x-ray argues."),
  entry("CLICK", "anatomy", "Mitral click. MVP is still a physical-exam word."),
  entry("SPLIT", "anatomy", "Split S2. Physiologic vs fixed vs paradoxical."),
  entry("FIXED", "anatomy", "Fixed split. ASD until you look."),
  entry("PLAVI", "procedure", "Plavix. The name everyone still uses."),
  entry("WARFA", "procedure", "Warfarin. Bridging is a locum-clinic headache."),
  entry("LOVEN", "procedure", "Lovenox. Bridging and ACS still use it."),
  entry("BIVAL", "procedure", "Bivalirudin. HIT and high-risk PCI."),
  entry("ANNUL", "anatomy", "Annulus. TAVR sizing starts here."),
  entry("ROOTS", "anatomy", "Aortic root. Aneurysm and valve together."),
];

const EXTRA_GUESSES = [
  "BLOOD", "CLOTS", "WIRES", "PROBE", "SWAN", "PAIN", "CHEST", "DRUGS", "DOSES",
  "BEATS", "PAUSE", "FLUTT", "SWIFT", "RAPID", "SLOW", "FAST", "VITAL", "PRESS",
  "FLUID", "SALINE", "BOLUS", "DRIPS", "PRESS", "MAPS", "SVR", "CO2",
  "ECHO", "NUKE", "SCAN", "READS", "FILMS", "VIEWS", "CLIP", "LOOP", "GAIN",
  "PROBE", "GEL", "TEE", "TTE", "ICE", "CMR", "CTA", "PET",
  "PCI", "PTCA", "DES", "BMS", "CTO", "LAD", "RCA", "LCX", "LMS", "SVG",
  "PFO", "ASD", "VSD", "PDA", "HOCM", "HCM", "DCM", "RCM", "ARVC",
  "ICD", "CRT", "PPM", "HIS", "LBBP", "CSP", "SICD",
  "VT", "VF", "SVT", "PVC", "PAC", "MAT", "SSS", "CHB", "WPW",
  "ACS", "CHF", "CAD", "PAD", "PE", "DVT", "HTN", "DM",
  "INR", "ACT", "EF", "EDV", "ESV", "SV", "CO", "CI", "PCWP",
  "LABS", "TROP", "BNP", "NTPRO", "CKMB", "CBC", "BMP",
  "NOTES", "ORDER", "PAGER", "NIGHT", "DAYS", "WEEK", "MONTH",
  "STATE", "BOARD", "LOGS", "FILE", "CV", "NPI",
  "PAY", "RATE", "DAILY", "GROSS", "NET", "TAXES",
  "FIT", "SCOPE", "MIX", "SKILL", "CALLS", "NIGHTS",
  "RADIAL", "FEMOR", "SHEATH", "WIRE", "BALLO", "DRILL",
  "MAP", "CARTO", "NAVX", "CRYO", "RF", "PFA",
  "PULMON", "TRICUS", "BICUSP", "ANNUL", "ROOT",
  "VIABLE", "STUNN", "HIBE", "SCARS", "ZONES",
  "STABLE", "ACUTE", "CHRON", "NEW", "OLD",
  "LEFT", "RIGHT", "BOTH", "DUAL", "SINGLE",
  "ONSET", "OFFSET", "BURST", "RAMP",
  "SENSE", "THRESH", "IMPED",
  "SHOCKS", "ATP", "CHARGE",
  "CLINIC", "ROUNDS", "CENSUS", "PANEL",
  "HOUSING", "FLIGHT", "RENTAL", "MILE",
  "OFFER", "QUOTE", "TERMS", "TAIL",
  "YES", "NO", "MAYBE", "SKIP",
  "HEARTS", "BEAT", "PULSES", "RATES",
  "VALVES", "STENTS", "GRAFTS", "LEADS",
  "NODES", "TRACT", "PATH", "LOOP",
  "ISCHEM", "INFARC", "NECRO",
  "DILATE", "NARROW", "TIGHT", "OPEN",
  "NORMAL", "ABNORM",
  "MILD", "MODER", "SEVERE",
  "FIRST", "SECOND", "THIRD",
  "ATRIAL", "VENTR",
  "SINUS", "JUNCT", "IDIOV",
  "NARROW", "WIDE",
  "REGULAR", "IRREG",
  "CAPTURE", "LOSS", "FAIL",
  "ENTRY", "EXIT",
  "ABOVE", "BELOW", "INSIDE",
].map((word) => word.toUpperCase());

function uniqueWords(words: string[]) {
  return [...new Set(words.map((word) => word.toUpperCase()))];
}

export const CARDIOLOGY_WORDLE_ALLOWED = new Set(
  uniqueWords([
    ...CARDIOLOGY_WORDLE_ANSWERS.map((item) => item.word),
    ...EXTRA_GUESSES,
  ]).filter((word) => word.length >= 3 && word.length <= 8 && /^[A-Z]+$/.test(word)),
);

export function isAllowedGuess(guess: string, length: number) {
  const word = guess.toUpperCase();
  return word.length === length && CARDIOLOGY_WORDLE_ALLOWED.has(word);
}

export function findAnswer(word: string) {
  const needle = word.toUpperCase();
  return CARDIOLOGY_WORDLE_ANSWERS.find((item) => item.word === needle);
}

export type WordleGuessEntry = {
  word: string;
  gloss?: string;
  category?: WordleCategory;
};

const ANSWER_BY_WORD = new Map(CARDIOLOGY_WORDLE_ANSWERS.map((item) => [item.word, item]));

/** Allowed guesses for a given length, sorted A–Z, with gloss when the word can also be an answer. */
export function guessBankForLength(length: number): WordleGuessEntry[] {
  return [...CARDIOLOGY_WORDLE_ALLOWED]
    .filter((word) => word.length === length)
    .sort((a, b) => a.localeCompare(b))
    .map((word) => {
      const answer = ANSWER_BY_WORD.get(word);
      return answer ? { word, gloss: answer.gloss, category: answer.category } : { word };
    });
}

export function searchGuessBank(entries: WordleGuessEntry[], query: string) {
  const needle = query.trim().toUpperCase();
  if (!needle) return entries;
  return entries
    .filter((entry) => {
      if (entry.word.includes(needle)) return true;
      return Boolean(entry.gloss && entry.gloss.toUpperCase().includes(needle));
    })
    .sort((a, b) => {
      const aStart = a.word.startsWith(needle) ? 0 : 1;
      const bStart = b.word.startsWith(needle) ? 0 : 1;
      if (aStart !== bStart) return aStart - bStart;
      return a.word.localeCompare(b.word);
    });
}
