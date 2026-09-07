import { MARATHI_PROBLEMS } from './marathi-problems';

/**
 * The seeded content, in Marathi.
 *
 * Same job as `hindi.ts`, same mechanism: seeded English string in, Marathi
 * string out, applied at the API so `challenge.title` stays a plain string and
 * no screen has to know a second language exists.
 *
 * It is a separate table rather than a fallback to Hindi because the two
 * languages disagree on almost every word that matters here. A Maharashtra
 * department is a `विभाग` in both, but its city is नागपूर not नागपुर, its waste
 * is घनकचरा not ठोस अपशिष्ट, its measurement is पडताळणी not सत्यापन, and its
 * corporation is a महानगरपालिका whose Marathi name is the one actually printed
 * on the building. Falling Marathi back to Hindi would put a Hindi spelling of
 * a Marathi place on a Government of Maharashtra page.
 *
 * The same two exclusions apply as in Hindi: case identifiers and checksums are
 * not translated, and contract clause text is never machine-translated.
 */

/* ------------------------------------------------------------- geography */

const PLACES: Record<string, string> = {
  Maharashtra: 'महाराष्ट्र',
  Karnataka: 'कर्नाटक',
  Rajasthan: 'राजस्थान',
  'Madhya Pradesh': 'मध्य प्रदेश',
  Gujarat: 'गुजरात',
  'Tamil Nadu': 'तमिळनाडू',
  Kerala: 'केरळ',
  Punjab: 'पंजाब',
  Odisha: 'ओडिशा',
  Assam: 'आसाम',
  Pune: 'पुणे',
  Nagpur: 'नागपूर',
  Mumbai: 'मुंबई',
  Nashik: 'नाशिक',
  Thane: 'ठाणे',
  Mysuru: 'म्हैसूर',
  'Bengaluru Urban': 'बेंगळुरू शहरी',
  Bengaluru: 'बेंगळुरू',
  Kota: 'कोटा',
  Jaipur: 'जयपूर',
  Indore: 'इंदूर',
  Surat: 'सुरत',
  Coimbatore: 'कोइम्बतूर',
  Kochi: 'कोची',
  Ludhiana: 'लुधियाना',
  'India region': 'भारत क्षेत्र',
  'Mumbai region, within India. No processing outside the territory.':
    'मुंबई क्षेत्र, भारताच्या हद्दीत. देशाबाहेर कोणतीही प्रक्रिया नाही.',
};

/* ----------------------------------------------------------- departments */

const DEPARTMENTS: Record<string, string> = {
  'Pune Municipal Corporation': 'पुणे महानगरपालिका',
  'Pune Municipal Corporation, water supply department': 'पुणे महानगरपालिका, पाणीपुरवठा विभाग',
  'Directorate of Transport': 'परिवहन संचालनालय',
  'Directorate of Transport, state road transport undertaking': 'परिवहन संचालनालय, राज्य मार्ग परिवहन उपक्रम',
  'Department of Agriculture': 'कृषी विभाग',
  'Department of Agriculture, district agriculture office': 'कृषी विभाग, जिल्हा कृषी कार्यालय',
  'Directorate of School Education': 'शालेय शिक्षण संचालनालय',
  'Directorate of School Education, district education office': 'शालेय शिक्षण संचालनालय, जिल्हा शिक्षण कार्यालय',
  'Nagpur Municipal Corporation': 'नागपूर महानगरपालिका',
  'Nagpur Municipal Corporation, solid waste management': 'नागपूर महानगरपालिका, घनकचरा व्यवस्थापन',
  'Bengaluru revenue department': 'बेंगळुरू महसूल विभाग',
  'Bruhat Bengaluru revenue department, property tax division': 'बृहत् बेंगळुरू महसूल विभाग, मालमत्ता कर विभाग',
  'Directorate of Health Services': 'आरोग्य सेवा संचालनालय',
  'Directorate of Health Services, emergency response cell': 'आरोग्य सेवा संचालनालय, आपत्कालीन प्रतिसाद कक्ष',
  'Public Works Department': 'सार्वजनिक बांधकाम विभाग',
  'Public Works Department, bridges and structures circle': 'सार्वजनिक बांधकाम विभाग, पूल व संरचना मंडळ',
  'Centre for Applied Measurement, Pune': 'उपयोजित मापन केंद्र, पुणे',
};

/* --------------------------------------------------------------- sectors */

const SECTORS: Record<string, string> = {
  'Water and sanitation': 'पाणी व स्वच्छता',
  Transport: 'परिवहन',
  Agriculture: 'कृषी',
  Education: 'शिक्षण',
  'Solid waste': 'घनकचरा',
  'Revenue and taxation': 'महसूल व कर',
  'Health services': 'आरोग्य सेवा',
  'Public works': 'सार्वजनिक बांधकाम',
  Energy: 'ऊर्जा',
  Governance: 'प्रशासन',
};

/* ---------------------------------------------------------- capabilities */

const CAPABILITIES: Record<string, string> = {
  'IoT sensors': 'IoT संवेदक',
  'Acoustic analytics': 'ध्वनिक विश्लेषण',
  'Predictive analytics': 'पूर्वानुमान विश्लेषण',
  'GIS mapping': 'GIS नकाशांकन',
  'Computer vision': 'संगणक दृष्टी',
  'Edge computing': 'एज संगणन',
  'Satellite imagery': 'उपग्रह प्रतिमा',
  'Machine learning': 'मशीन लर्निंग',
  'Mobile field applications': 'मोबाइल क्षेत्रीय अनुप्रयोग',
  'Natural language processing': 'नैसर्गिक भाषा प्रक्रिया',
  'Workflow automation': 'कार्यप्रवाह स्वयंचलन',
  'Route optimisation': 'मार्ग अनुकूलन',
  Telemetry: 'दूरमापन',
  'Drone survey': 'ड्रोन सर्वेक्षण',
  'Structural analysis': 'संरचनात्मक विश्लेषण',
  'Digital twin': 'डिजिटल जुळे',
  'Data integration': 'माहिती एकत्रीकरण',
  Dashboards: 'नियंत्रण फलक',
  'Anomaly detection': 'विसंगती शोध',
  'Speech recognition': 'वाणी ओळख',
  'Document digitisation': 'दस्तऐवज अंकीकरण',
  'Sensor networks': 'संवेदक जाळे',
  'Energy metering': 'ऊर्जा मापन',
  'Fleet management': 'वाहनताफा व्यवस्थापन',
  Geofencing: 'भू-परिसीमन',
};

/* ----------------------------------------------------------------- units */

const UNITS: Record<string, string> = {
  minutes: 'मिनिटे',
  hours: 'तास',
  days: 'दिवस',
  percent: 'टक्के',
  'percentage points': 'टक्के गुण',
  litres: 'लिटर',
  'litres per day': 'लिटर प्रतिदिन',
  count: 'संख्या',
  'per thousand': 'दर हजारी',
  'per lakh': 'दर लाखी',
  rupees: 'रुपये',
  kilometres: 'किलोमीटर',
  students: 'विद्यार्थी',
  households: 'कुटुंबे',
  tonnes: 'टन',
};

/* ------------------------------------------------------- people and firms
 * Proper nouns, written in the reader's script rather than translated. Several
 * of these are Marathi surnames that Hindi transliterates differently —
 * राठोड, not राठौर.
 */

const PEOPLE: Record<string, string> = {
  'A. Deshmukh': 'ए. देशमुख',
  'U. Bhagat': 'यू. भगत',
  'R. Bhat': 'आर. भट',
  'P. Rathore': 'पी. राठोड',
  'D. Patil': 'डी. पाटील',
  'Dr. A. Ramanathan': 'डॉ. ए. रामनाथन',
  'Meera Kulkarni': 'मीरा कुलकर्णी',
  'Nodal officer': 'नोडल अधिकारी',
  'Deputy commissioner': 'उपायुक्त',
  'Procurement officer': 'खरेदी अधिकारी',
  'Senior fellow, public systems': 'ज्येष्ठ अभ्यासक, सार्वजनिक व्यवस्था',
  'Co-founder and chief executive': 'सह-संस्थापक व मुख्य कार्यकारी',
  'Independent validation body': 'स्वतंत्र पडताळणी संस्था',
  'Programme director': 'कार्यक्रम संचालक',
  'Authorised signatory': 'अधिकृत स्वाक्षरीकर्ता',
  'Technical director': 'तांत्रिक संचालक',
  'Department nodal officer': 'विभागाचा नोडल अधिकारी',
  'Department finance officer': 'विभागाचा वित्त अधिकारी',
  'Department data custodian': 'विभागाचा माहिती संरक्षक',
  'AquaSense project lead': 'AquaSense प्रकल्प प्रमुख',
};

/* -------------------------------------------------------- problem library */

const PROBLEMS: Record<string, string> = {
  /* ---- titles ---- */
  'Smart water leakage detection': 'पाणीगळतीचा त्वरित शोध',
  'Bus depot fuel pilferage': 'बस आगारातील इंधनचोरी',
  'Crop residue burning detection and response': 'शेतातील काडीकचरा जाळण्याचा शोध व प्रतिसाद',
  'School dropout early warning': 'शाळाबाह्य होण्याची पूर्वसूचना',
  'Dry waste segregation at source': 'उगमस्थानी सुक्या कचऱ्याचे वर्गीकरण',
  'Tax notice language simplification': 'कर सूचनेच्या भाषेचे सुलभीकरण',
  'Ambulance dispatch routing': 'रुग्णवाहिका पाठवणी व मार्ग निर्धारण',
  'Signal timing optimisation on arterial corridors': 'मुख्य मार्गांवरील सिग्नल-वेळेचे अनुकूलन',
  'Remote inspection of bridges and culverts': 'पूल व मोऱ्यांची दूरस्थ पाहणी',
  'Primary health centre access for remote habitations': 'दुर्गम वस्त्यांसाठी प्राथमिक आरोग्य केंद्रापर्यंत पोहोच',
  'Street light fault detection and energy loss': 'पथदिव्यांतील बिघाडाचा शोध व ऊर्जाहानी',
  'Property tax assessment gap detection': 'मालमत्ता कर आकारणीतील तफावतीचा शोध',

  /* ---- the second pass, which reuses a problem for another zone ---- */
  'western zone': 'पश्चिम विभाग',
  'phase two': 'दुसरा टप्पा',
  'northern circle': 'उत्तर मंडळ',
  'second corridor': 'दुसरी मार्गिका',
  'outer wards': 'बाह्य प्रभाग',
  'district extension': 'जिल्हा विस्तार',
  'peri-urban belt': 'नागरी-लगतचा पट्टा',
  'east division': 'पूर्व विभाग',
  'block cluster two': 'गट समूह दोन',
  'ring road corridor': 'रिंग रोड मार्गिका',
  'south division': 'दक्षिण विभाग',
  'satellite towns': 'उपनगरे',

  /* ---- water: the case the whole product is seeded around ---- */
  'About 3.4 lakh households on the eastern distribution zone, plus the 42 field crews who chase leaks by hand.':
    'पूर्व वितरण विभागातील सुमारे ३.४ लाख कुटुंबे, आणि हाताने गळती शोधणारी ४२ क्षेत्रीय पथके.',
  'A leak is usually noticed when a resident calls the ward office or when pressure drops enough to be visible. A crew is dispatched, walks the line with an acoustic rod, and isolates the section. On buried mains under carriageway the search can take a full shift.':
    'गळती सहसा तेव्हाच लक्षात येते जेव्हा एखादा रहिवासी प्रभाग कार्यालयाला कळवतो, किंवा दाब दिसण्याइतका खाली येतो. एक पथक पाठवले जाते, ते ध्वनिक कांडी घेऊन वाहिनीच्या बाजूने चालते आणि तो भाग वेगळा करतो. रस्त्याखाली पुरलेल्या मुख्य वाहिन्यांवर या शोधाला पूर्ण पाळी लागू शकते.',
  'Around 190 reported leaks a month across the zone, of which roughly 60 are on trunk mains.':
    'या विभागात दरमहा सुमारे १९० गळत्या नोंदवल्या जातात, त्यांपैकी अंदाजे ६० मुख्य वाहिन्यांवर असतात.',
  'Non-revenue water in the zone is 34 percent. At the current bulk purchase rate this is about ₹4.1 crore a year of treated water that is produced and never billed.':
    'या विभागातील बिनमहसुली पाणी ३४ टक्के आहे. सध्याच्या घाऊक खरेदी दराने हे दरवर्षी सुमारे ₹४.१ कोटींचे प्रक्रिया केलेले पाणी आहे, जे तयार होते पण त्याचे कधीच देयक निघत नाही.',
  'District metering exists but readings are collected manually once a week. There is no continuous pressure telemetry below the reservoir outlet.':
    'जिल्हा पातळीवर मापन आहे, पण नोंदी आठवड्यातून एकदा हाताने घेतल्या जातात. जलाशयाच्या निर्गमाखाली सलग दाब-दूरमापन नाही.',
  'Average time from leak occurrence to field crew locating it':
    'गळती सुरू होण्यापासून क्षेत्रीय पथकाला ती सापडेपर्यंतचा सरासरी वेळ',
  'Median of the ward complaint register timestamps against crew closure timestamps, sampled over 12 weeks.':
    '१२ आठवड्यांच्या नमुन्यावर, प्रभाग तक्रार नोंदवहीतील वेळनोंदी आणि पथकाच्या काम-समाप्ती वेळनोंदी यांच्यातील मध्यक.',
  'Ward complaint register and crew job cards, water supply department':
    'प्रभाग तक्रार नोंदवही आणि पथकाची कामपत्रके, पाणीपुरवठा विभाग',
  'Average leak detection time': 'सरासरी गळती-शोध वेळ',

  /* ---- the remaining eleven, at the fields a reader meets first ---- */
  'Cut the time between a leak starting and a crew standing over it, without adding staff to the zone.':
    'विभागात कर्मचारी न वाढवता, गळती सुरू होण्यापासून पथक तिथे पोहोचेपर्यंतचा वेळ कमी करा.',
  'Know which depot lost fuel, on which shift, without waiting for the monthly reconciliation.':
    'मासिक ताळमेळाची वाट न पाहता, कोणत्या आगारात कोणत्या पाळीत इंधन कमी झाले हे कळू द्या.',
  'Reach a burning plot while the evidence is still on the ground.':
    'पुरावा जमिनीवर असतानाच जळणाऱ्या शेतापर्यंत पोहोचा.',
  'Identify a child at risk of dropping out while there is still a term left to act in.':
    'कृती करण्यासाठी अजून एक सत्र शिल्लक असतानाच शाळा सोडण्याचा धोका असलेले मूल ओळखा.',
  'Recover more clean recyclable material without adding a sorting shift.':
    'वर्गीकरणाची पाळी न वाढवता अधिक स्वच्छ पुनर्वापरयोग्य सामग्री मिळवा.',
  'Write a notice an assessee can act on without visiting the ward office, without weakening its legal effect.':
    'अशी सूचना लिहा जिच्यावर करदाता प्रभाग कार्यालयात न जाता कृती करू शकेल, आणि जिचा कायदेशीर परिणामही कमी होणार नाही.',
  'Get a vehicle on scene inside the service standard more often, with the fleet already in place.':
    'सध्याच्याच वाहनताफ्यासह, सेवा मानकाच्या आत घटनास्थळी वाहन अधिक वेळा पोहोचवा.',
  'Cut the time a vehicle spends stopped on the corridor without rebuilding a junction.':
    'एकही चौक नव्याने न बांधता, मार्गिकेवर वाहन थांबून राहण्याचा वेळ कमी करा.',
  'Get a complete, comparable condition record for every structure, every year.':
    'प्रत्येक संरचनेची पूर्ण आणि तुलना करता येईल अशी स्थिती-नोंद दरवर्षी मिळवा.',
  'Put the camp where the unmet need is this quarter, not where the rotation says.':
    'फेरपाळी सांगते तिथे नव्हे, तर या तिमाहीत जिथे गरज भागलेली नाही तिथे शिबिर लावा.',
  'Know a light has failed before a resident reports it, and know what it is costing.':
    'रहिवाशाने तक्रार करण्यापूर्वीच दिवा बंद पडल्याचे कळू द्या, आणि त्याची किंमत किती हेही कळू द्या.',
  'Find the properties paying on an assessment that no longer matches what is built.':
    'प्रत्यक्ष बांधकामाशी आता जुळत नसलेल्या आकारणीवर कर भरणाऱ्या मालमत्ता शोधा.',
};

/* ------------------------------------------------------- risks and status */

const OPERATIONAL: Record<string, string> = {
  'Departmental data extract delayed beyond the agreed date': 'विभागीय माहिती-निर्यात ठरलेल्या तारखेनंतर विलंबित',
  'Field staff do not adopt the mobile workflow': 'क्षेत्रीय कर्मचारी मोबाइल कार्यप्रवाह स्वीकारत नाहीत',
  'Monsoon restricts site access during the measurement window': 'मापन कालावधीत पावसाळ्यामुळे स्थळापर्यंतची पोहोच मर्यादित',
  'Sensor supply lead time exceeds the milestone schedule': 'संवेदक पुरवठ्याचा कालावधी टप्पा-वेळापत्रकापेक्षा जास्त',
  'Sub-processor added without prior written approval': 'पूर्वलेखी मान्यतेशिवाय उप-प्रक्रियाकर्ता जोडला गेला',
  'Baseline period is not comparable to the pilot period': 'आधारभूत कालावधी प्रायोगिक कालावधीशी तुलनीय नाही',
  'Milestone payment slips past the configured limit': 'टप्पा-प्रदान ठरलेल्या मुदतीच्या पुढे गेले',
  'Scope creep from ward-level requests outside the agreement': 'कराराबाहेरील प्रभाग-पातळीवरील मागण्यांमुळे कार्यकक्षेचा विस्तार',

  'Deployment and instrumentation complete': 'तैनाती व उपकरण-स्थापना पूर्ण',
  'Measurement period one complete': 'पहिला मापन कालावधी पूर्ण',
  'Final measurement, handover and training complete': 'अंतिम मापन, हस्तांतरण व प्रशिक्षण पूर्ण',

  Synthetic: 'कृत्रिम',
  Masked: 'आच्छादित',
  Production: 'प्रत्यक्ष',
  production: 'प्रत्यक्ष',
  masked: 'आच्छादित',
  synthetic: 'कृत्रिम',
};

/* ------------------------------------------------- gates, stages, roles */

const PROGRAMME: Record<string, string> = {
  'Problem is real and funded': 'अडचण खरी आहे आणि तिला निधी आहे',
  'Fit for public release': 'सार्वजनिक प्रकाशनास योग्य',
  'Shortlist candidates': 'उमेदवारांची निवडसूची',
  'Award pilot': 'प्रायोगिक प्रकल्पाचे कंत्राट',
  'Continue or stop the pilot': 'प्रायोगिक प्रकल्प चालू ठेवायचा की थांबवायचा',
  'Pilot succeeded': 'प्रायोगिक प्रकल्प यशस्वी झाला',
  'Scale, procure, re-tender or close': 'विस्तार, खरेदी, पुनर्निविदा की समाप्ती',

  'Challenge intake and framing': 'आव्हानाची नोंद व मांडणी',
  'Publication and demand signalling': 'प्रकाशन व मागणीची सूचना',
  'Discovery and application': 'शोध व अर्ज',
  'Eligibility screening': 'पात्रता छाननी',
  'Expert evaluation and selection': 'तज्ज्ञ मूल्यांकन व निवड',
  'Pilot design and milestone contracting': 'प्रायोगिक प्रकल्पाची रचना व टप्पानिहाय करार',
  'Pilot execution and measurement': 'प्रायोगिक प्रकल्पाची अंमलबजावणी व मापन',
  'Independent validation': 'स्वतंत्र पडताळणी',
  'Procurement, scale-up and replication': 'खरेदी, विस्तार व पुनरावृत्ती',

  'Department nodal officer': 'विभागाचा नोडल अधिकारी',
  'Programme management unit': 'कार्यक्रम व्यवस्थापन कक्ष',
  Startups: 'स्टार्टअप',
  'Rule engine and screening committee': 'नियम-यंत्र व छाननी समिती',
  'External evaluators': 'बाह्य मूल्यांकनकर्ते',
  'Department and startup': 'विभाग व स्टार्टअप',
  'Startup and department': 'स्टार्टअप व विभाग',
  'Independent validator': 'स्वतंत्र पडताळणीकर्ता',
  'Competent authority': 'सक्षम प्राधिकारी',

  'Department administrator': 'विभाग प्रशासक',
  'Procurement officer': 'खरेदी अधिकारी',
  Evaluator: 'मूल्यांकनकर्ता',
  Startup: 'स्टार्टअप',
  Public: 'सर्वसामान्य नागरिक',
};


/* --------------------------------------------------- the nine stages, in prose
 *
 * What happens at each stage and what it produces, for a department and for a
 * startup. Read out of `src/config/stages.ts` by the component that draws them
 * and translated at render through `useSay()`, the same way gate names and
 * stage titles are.
 */
const STAGE_PROSE: Record<string, string> = {
  'You describe the operational problem, measure what it costs today, and turn it into an outcome someone else could be paid to achieve.':
    'तुम्ही कार्यचालनातील अडचणीचे वर्णन करता, आज तिची किंमत किती हे मोजता, आणि तिचे अशा निष्पत्तीत रूपांतर करता जी साध्य करण्यासाठी दुसऱ्या कोणाला मोबदला देता येईल.',
  'A baseline, an outcome KPI, a budget head and a draft challenge.':
    'एक आधाररेखा, एक निष्पत्ती KPI, एक अर्थसंकल्पीय शीर्ष आणि एक मसुदा आव्हान.',
  'Nothing yet. The department is still deciding whether the problem is real and funded.':
    'अद्याप काहीही नाही. अडचण खरी आहे का आणि तिला निधी आहे का, हे विभाग अजून ठरवत आहे.',
  'No public record until gate 1 clears.':
    'द्वार १ पार होईपर्यंत कोणतीही सार्वजनिक नोंद नाही.',
  'The programme unit checks that you have asked for an outcome, not named a product.':
    'तुम्ही निष्पत्ती मागितली आहे, उत्पादनाचे नाव घेतलेले नाही, हे कार्यक्रम कक्ष तपासतो.',
  'A published challenge with a rubric, an IP position and a data annexure.':
    'मूल्यांकन निकष, बौद्धिक संपदेची भूमिका आणि माहिती परिशिष्ट यांसह एक प्रकाशित आव्हान.',
  'The challenge appears on the demand board with its budget, deadline and evaluation rubric in the open.':
    'आव्हान त्याचा अर्थसंकल्प, अंतिम मुदत आणि मूल्यांकन निकषांसह मागणी फलकावर उघडपणे दिसू लागते.',
  'A public challenge you can read in full before deciding to spend a week on it.':
    'एक सार्वजनिक आव्हान, ज्यावर आठवडा खर्च करायचा की नाही हे ठरवण्यापूर्वी तुम्ही ते पूर्ण वाचू शकता.',
  'Applications arrive. You answer clarification questions in public, within the configured window.':
    'अर्ज येऊ लागतात. ठरलेल्या मुदतीत, स्पष्टीकरणाच्या प्रश्नांची उत्तरे तुम्ही जाहीरपणे देता.',
  'An applicant pool and a published clarification record.':
    'अर्जदारांचा एक संच आणि एक प्रकाशित स्पष्टीकरण नोंद.',
  'You check eligibility against your verified profile before writing anything, then apply in six steps with autosave.':
    'काहीही लिहिण्यापूर्वी तुम्ही तुमच्या पडताळलेल्या प्रोफाइलवर पात्रता तपासता, मग आपोआप जतनासह सहा पायऱ्यांत अर्ज करता.',
  'A submitted application with a reference number and a timestamped receipt.':
    'संदर्भ क्रमांक आणि वेळनोंद असलेल्या पावतीसह सादर केलेला अर्ज.',
  'Rules run automatically against verified facts. Anything the engine cannot decide goes to a human, who must write down why.':
    'पडताळलेल्या तथ्यांवर नियम आपोआप चालतात. यंत्राला जे ठरवता येत नाही ते माणसाकडे जाते, आणि त्याला कारण लिहावेच लागते.',
  'An eligibility ledger with a result, evidence and a citation per rule.':
    'प्रत्येक नियमामागे निकाल, पुरावा आणि संदर्भ असलेली पात्रता नोंदवही.',
  'You see exactly which rule you passed or failed, the evidence used and the rule cited.':
    'तुम्ही कोणता नियम पार केला किंवा नाही, कोणता पुरावा वापरला गेला आणि कोणता नियम उद्धृत केला, हे तुम्हाला नेमके दिसते.',
  'A written eligibility outcome. Never a silent rejection.':
    'लेखी पात्रता निकाल. मूक नकार कधीही नाही.',
  'Evaluators declare conflicts before they can open a proposal, then score against the published rubric with a written reason per criterion.':
    'प्रस्ताव उघडण्यापूर्वी मूल्यांकनकर्ते हितसंबंध जाहीर करतात, मग प्रकाशित निकषांवर प्रत्येक कसोटीमागे लेखी कारणासह गुण देतात.',
  'Scores, rationales, variance flags and signed evaluation minutes.':
    'गुण, कारणमीमांसा, तफावतीचे इशारे आणि सही केलेले मूल्यांकन इतिवृत्त.',
  'You are scored against the same rubric you read before applying. Nothing is added afterwards.':
    'अर्ज करण्यापूर्वी तुम्ही जे निकष वाचले होते, त्यांच्यावरच तुमचे गुणांकन होते. नंतर काहीही जोडले जात नाही.',
  'A result you can trace back to specific criteria.':
    'असा निकाल जो तुम्ही विशिष्ट कसोट्यांपर्यंत मागे नेऊ शकता.',
  'You agree scope, milestones, acceptance tests, data tier and payment per milestone before work starts.':
    'काम सुरू होण्यापूर्वी तुम्ही कार्यकक्षा, टप्पे, स्वीकृती चाचण्या, माहितीचा स्तर आणि टप्प्यामागे प्रदान ठरवता.',
  'A signed pilot agreement with an acceptance test attached to every rupee.':
    'प्रत्येक रुपयामागे एक स्वीकृती चाचणी जोडलेला, सही केलेला प्रायोगिक प्रकल्प करार.',
  'You read the clauses in plain language first, then the legal text, then sign in two steps.':
    'तुम्ही आधी कलमे सोप्या भाषेत वाचता, मग कायदेशीर मजकूर, आणि मग दोन पायऱ्यांत सही करता.',
  'A countersigned contract and a milestone schedule you can plan against.':
    'प्रतिस्वाक्षरी झालेला करार आणि ज्यानुसार तुम्ही नियोजन करू शकता असे टप्पा-वेळापत्रक.',
  'Evidence arrives against each milestone. You accept, return or reject it, explicitly, within the review window.':
    'प्रत्येक टप्प्यामागे पुरावे येतात. आढावा मुदतीत तुम्ही ते स्पष्टपणे स्वीकारता, परत पाठवता किंवा नाकारता.',
  'Accepted milestones, KPI readings, a risk register and an incident log.':
    'स्वीकारलेले टप्पे, KPI नोंदी, एक जोखीम नोंदवही आणि एक घटना नोंद.',
  'You submit evidence, and the payment clock starts the moment a milestone is accepted — visibly.':
    'तुम्ही पुरावा सादर करता, आणि टप्पा स्वीकारला जाताच प्रदानाचे घड्याळ सुरू होते — सर्वांना दिसेल असे.',
  'Milestone acceptances and payment claims with an ageing clock anyone can see.':
    'टप्पा-स्वीकृती आणि प्रदान दावे, कोणालाही दिसेल अशा वयोमापक घड्याळासह.',
  'Someone outside the department re-derives the numbers from the raw records and reports against every success criterion.':
    'विभागाबाहेरील कोणीतरी कच्च्या नोंदींवरून आकडे पुन्हा काढतो आणि प्रत्येक यश-कसोटीच्या तुलनेत अहवाल देतो.',
  'A hashed, published validation report, including where the pilot fell short.':
    'हॅशसह प्रकाशित पडताळणी अहवाल, ज्यात प्रायोगिक प्रकल्प कुठे कमी पडला हेही आहे.',
  'Your claimed outcome is checked against raw data. A validated result becomes a verifiable reference.':
    'तुम्ही दावा केलेली निष्पत्ती कच्च्या माहितीशी ताडून पाहिली जाते. पडताळलेला निकाल हा तपासता येणारा संदर्भ बनतो.',
  'An independently validated deployment record.':
    'स्वतंत्रपणे पडताळलेली तैनाती नोंद.',
  'A successful pilot is not a purchase. You choose a procurement pathway and justify it against the rule that permits it.':
    'यशस्वी प्रायोगिक प्रकल्प म्हणजे खरेदी नव्हे. तुम्ही खरेदीचा मार्ग निवडता आणि तो ज्या नियमाने परवानगी दिली आहे त्याच्या आधारे समर्थनीय ठरवता.',
  'A pathway note, a value-for-money analysis and a replication package other departments can use.':
    'एक मार्ग-टिपण, एक मूल्य-विरुद्ध-पैसा विश्लेषण आणि इतर विभागांना वापरता येईल असा पुनरावृत्ती संच.',
  'You learn the pathway and the authority deciding it, with an indicative timeline.':
    'तुम्हाला मार्ग आणि तो ठरवणारे प्राधिकरण कळते, अंदाजित कालरेषेसह.',
  'A procurement decision with reasons, published either way.':
    'कारणांसह खरेदी निर्णय, निकाल काहीही असो, प्रकाशित.',
};


/* ------------------------------------------------ the rest of the seed
 *
 * Integration names, screening timeline labels, risk and change-request
 * titles, KPI names, the solution summary, and the outcome statements whose
 * wording differs from the problem library above. Every one of these is on
 * a page a reader opens; none of them had an entry, so they were served in
 * English under a translated heading.
 */
const REMAINING_SEED: Record<string, string> = {
  'DPIIT / Startup India recognition':
    'DPIIT / स्टार्टअप इंडिया मान्यता',
  'Government e-Marketplace':
    'गव्हर्नमेंट ई-मार्केटप्लेस',
  'Public Financial Management System':
    'सार्वजनिक वित्तीय व्यवस्थापन प्रणाली',
  'Government single sign-on':
    'शासकीय एकल साइन-ऑन',
  'Email notification service':
    'ईमेल सूचना सेवा',
  'Application submitted':
    'अर्ज सादर',
  'Eligible — all rules passed, two relaxations applied':
    'पात्र — सर्व नियम पूर्ण, दोन सवलती लागू',
  'Shortlisted at gate 2':
    'द्वार २ वर निवडसूचीत',
  'Evaluation complete, ranked first of fourteen':
    'मूल्यांकन पूर्ण, चौदापैकी प्रथम क्रमांक',
  'Pilot awarded at gate 3':
    'द्वार ३ वर प्रायोगिक प्रकल्पाचे कंत्राट',
  'Draft created from the outcome-based problem statement template.':
    'निष्पत्ती-आधारित अडचण-कथन नमुन्यावरून मसुदा तयार केला.',
  'Published after gate 1 cleared.':
    'द्वार १ पार झाल्यावर प्रकाशित.',
  'Masked extract query returned more rows than the agreed field list permits':
    'आच्छादित निष्कर्षण प्रश्नाने ठरलेल्या क्षेत्र-सूचीपेक्षा अधिक ओळी परत केल्या',
  'Extend the measurement window by three weeks and add two depot sites':
    'मापन कालावधी तीन आठवड्यांनी वाढवा आणि दोन आगार स्थळे जोडा',
  'Non-revenue water in the pilot zone':
    'प्रायोगिक विभागातील बिनमहसुली पाणी',
  'Crew jobs closed on first visit':
    'पहिल्याच भेटीत पूर्ण झालेली पथक-कामे',
  'Acoustic leak localisation for water distribution networks':
    'पाणी वितरण जाळ्यासाठी ध्वनिक गळती स्थाननिश्चिती',
  'Permanent acoustic loggers correlated against a pressure model, delivering leak localisation to a 30-metre segment into the existing complaint register.':
    'दाब प्रारूपाशी सहसंबंधित कायमस्वरूपी ध्वनिक नोंदक, जे सध्याच्या तक्रार नोंदवहीत ३० मीटर टप्प्यापर्यंत गळतीचे स्थान सांगतात.',
  'Bring unexplained diesel draw down to a level the depot manager can investigate the same week.':
    'अस्पष्ट डिझेल उपसा अशा पातळीवर आणा की आगार व्यवस्थापक त्याच आठवड्यात त्याची चौकशी करू शकेल.',
  'Find the child who is about to stop coming, while a teacher can still do something about it.':
    'जे मूल येणे थांबवणार आहे त्याला शिक्षक अजून काही करू शकत असतानाच शोधा.',
  'Move the same vehicles through the corridor faster in peak, using the controllers already installed.':
    'आधीच बसवलेल्या नियंत्रकांनीच, गर्दीच्या वेळी त्याच वाहनांना मार्गिकेतून अधिक वेगाने पुढे न्या.',
  'Know a light has failed before a resident tells you, and fix it inside a week.':
    'रहिवाशाने सांगण्यापूर्वीच दिवा बंद पडल्याचे कळू द्या, आणि तो आठवडाभरात दुरुस्त करा.',
  'Find the assessment gap from imagery, and send a surveyor only where it matters.':
    'प्रतिमांवरून आकारणीतील तफावत शोधा, आणि सर्वेक्षक फक्त जिथे गरज आहे तिथेच पाठवा.',
  'Private limited company':
    'प्रायव्हेट लिमिटेड कंपनी',
  'Limited liability partnership':
    'मर्यादित दायित्व भागीदारी',
  'Registered partnership':
    'नोंदणीकृत भागीदारी',
  'Sole proprietorship':
    'एकल मालकी',
};

/**
 * One flat table, built once at module load — the localiser walks every string
 * in every response, and a chain of lookups per string would be that work over
 * again for nothing.
 */
export const MARATHI: Readonly<Record<string, string>> = Object.freeze({
  ...REMAINING_SEED,
  ...STAGE_PROSE,
  ...PLACES,
  ...DEPARTMENTS,
  ...SECTORS,
  ...CAPABILITIES,
  ...UNITS,
  ...PEOPLE,
  ...PROBLEMS,
  ...OPERATIONAL,
  ...PROGRAMME,
  ...MARATHI_PROBLEMS,
});
