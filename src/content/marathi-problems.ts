/**
 * The eleven remaining seeded problems, in full, in Marathi.
 *
 * Counterpart to `hindi-problems.ts`, and kept in its own file for the same
 * reason: eleven problems times nine fields is ninety-nine strings, and putting
 * them beside the twenty-entry unit table would bury it. The water case lives
 * in `marathi.ts` because it is the one the whole product is seeded around.
 *
 * Every prose field a reader actually meets on a challenge document: who the
 * problem affects, what happens today, how often, what it costs, what the
 * department is currently limited by, the baseline metric and how it is
 * measured, where the figure comes from, and the metric the outcome is set
 * against.
 *
 * Figures are written in Devanagari numerals here, as a Marathi government
 * notice writes them. The identifiers are not — a case number is the same
 * string in every language, and `localise.ts` never sends one through this
 * table.
 */

export const MARATHI_PROBLEMS: Readonly<Record<string, string>> = Object.freeze({
  /* ------------------------------------------------------ who is affected */
  'Nine depots operating 1,240 buses, and the depot managers accountable for fuel variance.':
    '१,२४० बसगाड्या चालवणारी नऊ आगारे, आणि इंधनातील तफावतीस जबाबदार असलेले आगार व्यवस्थापक.',
  '11 tehsils, about 78,000 cultivators, and the district agriculture officers who must respond.':
    '११ तालुके, सुमारे ७८,००० शेतकरी, आणि प्रतिसाद द्यावा लागणारे जिल्हा कृषी अधिकारी.',
  '612 upper primary schools and about 1.9 lakh enrolled children in the district.':
    'जिल्ह्यातील ६१२ उच्च प्राथमिक शाळा आणि सुमारे १.९ लाख नोंदणीकृत मुले.',
  '1.1 lakh households in four wards and the 320 collection staff who sort by hand at the transfer point.':
    'चार प्रभागांतील १.१ लाख कुटुंबे आणि हस्तांतरण केंद्रावर हाताने वर्गीकरण करणारे ३२० संकलन कर्मचारी.',
  'About 2.7 lakh property tax assessees receiving demand and default notices each year.':
    'दरवर्षी मागणी व थकबाकी सूचना मिळणारे सुमारे २.७ लाख मालमत्ता करदाते.',
  'About 41 lakh people': 'सुमारे ४१ लाख लोक',
  '64 ambulances covering an urban and peri-urban area of about 41 lakh people.':
    'सुमारे ४१ लाख लोकसंख्येचा नागरी व नागरी-लगतचा भाग सांभाळणाऱ्या ६४ रुग्णवाहिका.',
  'About 6.2 lakh daily trips across 38 signalised junctions on three arterial corridors.':
    'तीन मुख्य मार्गिकांवरील ३८ सिग्नलयुक्त चौकांतून दररोज सुमारे ६.२ लाख फेऱ्या.',
  '1,860 minor bridges and culverts, and the 24 assistant engineers responsible for inspecting them.':
    '१,८६० लहान पूल व मोऱ्या, आणि त्यांच्या पाहणीस जबाबदार असलेले २४ सहायक अभियंते.',
  'About 2.3 lakh people in 340 habitations more than eight kilometres from a functioning centre.':
    'सुरू असलेल्या केंद्रापासून आठ किलोमीटरहून अधिक अंतरावरील ३४० वस्त्यांमधील सुमारे २.३ लाख लोक.',
  '48,000 street light points across 12 wards.': '१२ प्रभागांतील ४८,००० पथदिवे.',
  'About 4.1 lakh assessed properties and an unknown number of unassessed and under-assessed ones.':
    'आकारणी झालेल्या सुमारे ४.१ लाख मालमत्ता, आणि आकारणी न झालेल्या व कमी आकारणी झालेल्या अज्ञात संख्येने मालमत्ता.',

  /* ------------------------------------------------ what happens today */
  'Fuel is issued against a manual indent at the depot pump. Reconciliation happens monthly against odometer readings, by which time the trail is cold.':
    'आगाराच्या पंपावर हाताने लिहिलेल्या मागणीपत्रावर इंधन दिले जाते. ताळमेळ महिन्यातून एकदा ओडोमीटर नोंदींशी घातला जातो, तोवर माग थंड पडलेला असतो.',
  'Burning events are identified from satellite thermal anomalies published the next day. By the time a field team reaches the plot, the fire is out and attribution is disputed.':
    'जाळण्याच्या घटना दुसऱ्या दिवशी प्रसिद्ध होणाऱ्या उपग्रह उष्णता-विसंगतींवरून ओळखल्या जातात. क्षेत्रीय पथक शेतापर्यंत पोहोचेपर्यंत आग विझलेली असते आणि जबाबदारी वादग्रस्त ठरते.',
  'A child is recorded as a dropout after 30 consecutive days of absence. Intervention starts after that, when the family has usually already moved or the child has started work.':
    'सलग ३० दिवस गैरहजर राहिल्यावर मूल शाळाबाह्य म्हणून नोंदवले जाते. हस्तक्षेप त्यानंतर सुरू होतो, तोवर कुटुंब सहसा स्थलांतरित झालेले असते किंवा मूल कामाला लागलेले असते.',
  'Mixed waste arrives at the transfer station and is separated manually on a belt. Recyclable fraction is contaminated by the time it is picked.':
    'मिश्र कचरा हस्तांतरण केंद्रावर येतो आणि पट्ट्यावर हाताने वेगळा केला जातो. पुनर्वापरयोग्य भाग उचलेपर्यंत दूषित झालेला असतो.',
  'Notices are generated from templates written in legal English and Marathi. Assessees visit the ward office to ask what the notice means, which is where most of the counter load comes from.':
    'कायदेशीर इंग्रजी व मराठीत लिहिलेल्या नमुन्यांवरून सूचना तयार होतात. सूचनेचा अर्थ विचारण्यासाठी करदाते प्रभाग कार्यालयात येतात, आणि खिडकीवरील बहुतांश गर्दी इथूनच येते.',
  'Dispatch is by nearest-vehicle radio call using a static zone map drawn in 2016. Crews route by local knowledge.':
    '२०१६ मध्ये तयार केलेल्या स्थिर विभाग-नकाशावरून, सर्वांत जवळच्या वाहनाला रेडिओवर बोलावून पाठवणी होते. पथके स्थानिक माहितीवरून मार्ग ठरवतात.',
  'Signal plans are fixed-time, revised roughly once a year from a manual count. Traffic police override plans manually at peak.':
    'सिग्नल आराखडे ठराविक वेळेचे असून, हाताने केलेल्या मोजणीवरून वर्षातून साधारण एकदा त्यांत सुधारणा होते. गर्दीच्या वेळी वाहतूक पोलीस आराखडे हाताने बदलतात.',
  'Each structure is inspected visually once a year. Access to soffits and piers usually requires a boat or a ladder party, so many inspections are abbreviated.':
    'प्रत्येक संरचनेची डोळ्यांनी पाहणी वर्षातून एकदा होते. तळभाग व खांबांपर्यंत पोहोचण्यासाठी सहसा होडी किंवा शिडीचे पथक लागते, त्यामुळे अनेक पाहण्या अर्धवट राहतात.',
  'Outreach camps are scheduled quarterly on a fixed rotation drawn up at the block level, regardless of where need actually is.':
    'गरज प्रत्यक्षात कुठे आहे याचा विचार न करता, गट पातळीवर ठरवलेल्या ठराविक फेरपाळीनुसार दर तिमाहीला शिबिरे आखली जातात.',
  'Faults are reported by residents or found by a deep patrol. Energy is billed on connected load, not on consumption.':
    'बिघाड रहिवासी कळवतात किंवा सखोल गस्तीत सापडतात. वीजबिल वापरावर नव्हे, तर जोडलेल्या भारावर आकारले जाते.',
  'Field surveyors re-measure properties on a rolling basis. A full cycle takes about seven years, by which time much of it is stale.':
    'क्षेत्रीय सर्वेक्षक मालमत्तांचे मोजमाप टप्प्याटप्प्याने पुन्हा करतात. एक पूर्ण फेरी सुमारे सात वर्षे घेते, तोवर त्यातील बरीच माहिती शिळी झालेली असते.',

  /* ------------------------------------------------------------ how often */
  'Monthly reconciliation, with unexplained variance recorded in seven of the last nine cycles.':
    'मासिक ताळमेळ, गेल्या नऊपैकी सात फेऱ्यांत अस्पष्ट तफावत नोंदवली गेली.',
  'Roughly 2,100 detected events across the season, concentrated in a six-week window.':
    'हंगामभरात अंदाजे २,१०० घटना आढळल्या, त्या सहा आठवड्यांच्या कालावधीत केंद्रित होत्या.',
  'About 4,300 children crossed the 30-day threshold last academic year.':
    'गेल्या शैक्षणिक वर्षात सुमारे ४,३०० मुलांनी ३० दिवसांची मर्यादा ओलांडली.',
  'Daily, roughly 96 tonnes across the four wards.': 'दररोज, चारही प्रभागांत मिळून अंदाजे ९६ टन.',
  'Roughly 2.7 lakh notices a year, with 41 percent generating a counter visit.':
    'दरवर्षी अंदाजे २.७ लाख सूचना, त्यांपैकी ४१ टक्क्यांमुळे खिडकीवर फेरी होते.',
  'About 780 emergency calls a day.': 'दररोज सुमारे ७८० आपत्कालीन दूरध्वनी.',
  'Continuous. Peak congestion twice daily on all three corridors.':
    'सतत. तिन्ही मार्गिकांवर दिवसातून दोनदा सर्वाधिक कोंडी.',
  'Annual cycle, with about 30 percent of structures inspected only partially.':
    'वार्षिक फेरी, सुमारे ३० टक्के संरचनांची पाहणी केवळ अर्धवट होते.',
  'Quarterly camps, about 1,360 a year across the district.':
    'तिमाही शिबिरे, जिल्ह्यात दरवर्षी सुमारे १,३६०.',
  'About 900 fault reports a month, with an average 9-day rectification time.':
    'दरमहा सुमारे ९०० बिघाड नोंदी, दुरुस्तीस सरासरी ९ दिवस.',
  'Rolling survey, roughly 58,000 properties a year.':
    'टप्प्याटप्प्याने सर्वेक्षण, दरवर्षी अंदाजे ५८,००० मालमत्ता.',

  /* -------------------------------------------------------- what it costs */
  'Unexplained diesel draw averages 3.8 percent of issue, roughly ₹2.6 crore a year across the nine depots.':
    'अस्पष्ट डिझेल उपसा वितरणाच्या सरासरी ३.८ टक्के आहे, नऊ आगारांत मिळून दरवर्षी अंदाजे ₹२.६ कोटी.',
  'Air quality penalties and health costs aside, the department spends about ₹90 lakh a season on field verification that arrives too late to act.':
    'हवेच्या गुणवत्तेचे दंड आणि आरोग्यखर्च बाजूला ठेवले तरी, कारवाईसाठी उशिरा पोहोचणाऱ्या क्षेत्रीय पडताळणीवर विभाग हंगामाला सुमारे ₹९० लाख खर्च करतो.',
  'Re-enrolment drives cost roughly ₹1.4 crore a year and recover under a third of those children.':
    'पुनर्नोंदणी मोहिमांवर दरवर्षी अंदाजे ₹१.४ कोटी खर्च होतात आणि त्यांतून त्या मुलांपैकी एक तृतीयांशहून कमी मुले परत येतात.',
  'Contaminated recyclables fetch about 40 percent less at auction. The ward loses close to ₹1.8 crore a year in realisable value and pays for manual sorting on top.':
    'दूषित पुनर्वापरयोग्य सामग्रीला लिलावात सुमारे ४० टक्के कमी भाव मिळतो. प्रभागाचे दरवर्षी सुमारे ₹१.८ कोटींचे वसूल होणारे मूल्य बुडते आणि वर हाताने वर्गीकरणाचा खर्चही करावा लागतो.',
  'Counter handling costs about ₹3.2 crore a year and delays collection by an average of 26 days per contested notice.':
    'खिडकीवरील कामकाजावर दरवर्षी सुमारे ₹३.२ कोटी खर्च होतात आणि प्रत्येक वादग्रस्त सूचनेमागे वसुलीस सरासरी २६ दिवस उशीर होतो.',
  'Median response time is 22 minutes against a 15-minute service standard. The gap is measured but not attributed.':
    '१५ मिनिटांच्या सेवा मानकाच्या तुलनेत मध्यक प्रतिसाद वेळ २२ मिनिटे आहे. ही तफावत मोजली जाते, पण तिचे कारण निश्चित केले जात नाही.',
  'Average corridor travel time in peak is 31 minutes against 19 minutes off-peak. Fuel and time cost is estimated at ₹6.4 crore a year on these corridors alone.':
    'गर्दीच्या वेळी मार्गिकेवरील सरासरी प्रवासवेळ ३१ मिनिटे आहे, तर गर्दीबाहेर १९ मिनिटे. केवळ याच मार्गिकांवरील इंधन व वेळेचा खर्च दरवर्षी अंदाजे ₹६.४ कोटी आहे.',
  'Deferred defect detection has led to four emergency closures in three years, each costing between ₹40 lakh and ₹1.2 crore in emergency works and diversion.':
    'दोष उशिरा लक्षात आल्यामुळे तीन वर्षांत चार वेळा आपत्कालीन बंद करावे लागले; प्रत्येक वेळी आपत्कालीन कामे व वळण मार्गावर ₹४० लाख ते ₹१.२ कोटी खर्च झाला.',
  'Camp utilisation averages 44 percent of planned footfall. Roughly ₹2.1 crore a year is spent on camps that reach fewer people than planned.':
    'शिबिरांचा वापर नियोजित उपस्थितीच्या सरासरी ४४ टक्के आहे. नियोजितापेक्षा कमी लोकांपर्यंत पोहोचणाऱ्या शिबिरांवर दरवर्षी अंदाजे ₹२.१ कोटी खर्च होतात.',
  'Estimated ₹5.7 crore a year billed for lights that were not burning, plus the safety cost of dark stretches.':
    'बंद असलेल्या दिव्यांचे दरवर्षी अंदाजे ₹५.७ कोटींचे बिल आकारले जाते, आणि वर अंधाऱ्या पट्ट्यांचा सुरक्षेचा खर्च.',
  'Independent sampling suggests 19 percent of properties are under-assessed, worth roughly ₹31 crore a year in foregone demand.':
    'स्वतंत्र नमुना तपासणीनुसार १९ टक्के मालमत्तांची आकारणी कमी झाली आहे; त्यामुळे दरवर्षी अंदाजे ₹३१ कोटींची मागणी बुडते.',

  /* ------------------------------------------ what the department is limited by */
  'Pumps have mechanical totalisers only. Odometer readings are entered by hand and are frequently rounded.':
    'पंपांवर केवळ यांत्रिक एकत्रमापक आहेत. ओडोमीटर नोंदी हाताने भरल्या जातात आणि वारंवार पूर्णांकित केल्या जातात.',
  'Satellite passes are twice daily and cloud cover blocks a quarter of the season. Plot-level attribution needs a field visit.':
    'उपग्रहाच्या फेऱ्या दिवसातून दोनदा होतात आणि ढगांमुळे हंगामाचा एक चतुर्थांश भाग झाकला जातो. शेतनिहाय जबाबदारी ठरवण्यासाठी प्रत्यक्ष भेट लागते.',
  'Attendance is entered weekly and often in arrears. There is no signal that combines attendance with the other things schools already know.':
    'हजेरी आठवड्याला भरली जाते आणि तीही अनेकदा उशिराने. हजेरी आणि शाळांना आधीच माहीत असलेल्या इतर गोष्टी एकत्र आणणारा कोणताही संकेत नाही.',
  'Segregation compliance is measured by spot inspection. There is no per-household record and no feedback to the household.':
    'वर्गीकरणाचे पालन जागेवरील तपासणीने मोजले जाते. कुटुंबनिहाय नोंद नाही आणि कुटुंबाला कोणताही प्रतिसादही जात नाही.',
  'Templates cannot be changed without legal sign-off, and the legal position must survive translation into two languages.':
    'कायदेशीर मान्यतेशिवाय नमुने बदलता येत नाहीत, आणि दोन भाषांत भाषांतर झाल्यावरही कायदेशीर स्थिती टिकून राहिली पाहिजे.',
  'Vehicle location is polled every 90 seconds. There is no live road-condition input and no way to model the effect of a reassignment.':
    'वाहनाचे स्थान दर ९० सेकंदांनी विचारले जाते. रस्त्याच्या सद्यःस्थितीची थेट माहिती नाही, आणि वाहन बदलल्यास काय परिणाम होईल हे ठरवण्याचा मार्गही नाही.',
  'Existing controllers accept plan changes but there is no vehicle detection at most junctions and no corridor-level coordination.':
    'सध्याची नियंत्रके आराखड्यातील बदल स्वीकारतात, पण बहुतांश चौकांत वाहन-ओळख नाही आणि मार्गिका पातळीवर समन्वयही नाही.',
  'Inspection is manual and its quality varies with access. Photographs are stored locally and not comparable year to year.':
    'पाहणी हाताने होते आणि तिचा दर्जा पोहोचण्याच्या सोयीनुसार बदलतो. छायाचित्रे स्थानिक पातळीवर साठवली जातात आणि वर्षानुवर्षे त्यांची तुलना करता येत नाही.',
  'Scheduling uses a paper rotation. There is no view of which habitations have unmet need in a given quarter.':
    'आखणी कागदी फेरपाळीवर चालते. एखाद्या तिमाहीत कोणत्या वस्त्यांची गरज भागलेली नाही, याचे चित्र कुठेही नाही.',
  'No point-level metering. Fault location depends on someone reporting the right pole number.':
    'दिव्यानिहाय मापन नाही. बिघाडाचे ठिकाण कोणीतरी योग्य खांब क्रमांक कळवण्यावर अवलंबून असते.',
  'Survey is manual and expensive. Imagery exists but is not tied to the assessment roll.':
    'सर्वेक्षण हाताने होते आणि महागडे आहे. प्रतिमा उपलब्ध आहेत, पण त्या आकारणी नोंदवहीशी जोडलेल्या नाहीत.',

  /* ------------------------------------------------------ the baseline metric */
  'Unexplained fuel draw as a share of total issue': 'एकूण वितरणातील अस्पष्ट इंधन उपशाचे प्रमाण',
  'Time from burning event to verified field response':
    'जाळण्याच्या घटनेपासून पडताळलेल्या क्षेत्रीय प्रतिसादापर्यंतचा वेळ',
  'Share of at-risk children identified before 30 days of absence':
    '३० दिवसांच्या गैरहजेरीपूर्वी ओळखल्या गेलेल्या धोक्यातील मुलांचे प्रमाण',
  'Recyclable fraction recovered clean at the transfer point':
    'हस्तांतरण केंद्रावर स्वच्छ स्वरूपात मिळालेल्या पुनर्वापरयोग्य भागाचे प्रमाण',
  'Share of notices generating a counter visit for clarification':
    'स्पष्टीकरणासाठी खिडकीवर फेरी घडवणाऱ्या सूचनांचे प्रमाण',
  'Median emergency response time': 'मध्यक आपत्कालीन प्रतिसाद वेळ',
  'Average peak travel time on the corridor': 'मार्गिकेवरील गर्दीच्या वेळचा सरासरी प्रवासवेळ',
  'Share of structures with a complete, comparable annual inspection record':
    'पूर्ण आणि तुलनायोग्य वार्षिक पाहणी-नोंद असलेल्या संरचनांचे प्रमाण',
  'Outreach camp utilisation against planned footfall': 'नियोजित उपस्थितीच्या तुलनेत शिबिरांचा वापर',
  'Average fault rectification time': 'बिघाड दुरुस्तीचा सरासरी वेळ',
  'Share of properties whose assessed area matches the built area within tolerance':
    'आकारणी केलेले क्षेत्रफळ मान्य फरकाच्या आत प्रत्यक्ष बांधकामाशी जुळणाऱ्या मालमत्तांचे प्रमाण',

  /* ------------------------------------------------------ how it is measured */
  'Monthly depot fuel reconciliation against kilometres operated, twelve-month trailing average.':
    'चालवलेल्या किलोमीटरच्या तुलनेत मासिक आगार इंधन ताळमेळ, बारा महिन्यांची मागे सरकणारी सरासरी.',
  'Median across the season of thermal anomaly timestamp to field verification form submission.':
    'उष्णता-विसंगतीच्या वेळनोंदीपासून क्षेत्रीय पडताळणी अर्ज सादर होईपर्यंतच्या कालावधीचा हंगामभरातील मध्यक.',
  'Retrospective comparison of intervention records against the eventual dropout register.':
    'हस्तक्षेप नोंदींची अंतिम शाळाबाह्य नोंदवहीशी पूर्वलक्ष्यी तुलना.',
  'Weekly weighbridge and sort audit at the transfer station, eight-week rolling average.':
    'हस्तांतरण केंद्रावरील साप्ताहिक वजनकाटा व वर्गीकरण लेखापरीक्षा, आठ आठवड्यांची सरकती सरासरी.',
  'Counter visit register matched to notice reference numbers over a six-month window.':
    'सहा महिन्यांच्या कालावधीत खिडकी-भेट नोंदवही सूचना संदर्भ क्रमांकांशी जुळवून पाहणे.',
  'Call receipt timestamp to on-scene timestamp, median over 90 days, excluding inter-facility transfers.':
    'दूरध्वनी मिळाल्याच्या वेळनोंदीपासून घटनास्थळी पोहोचल्याच्या वेळनोंदीपर्यंत, ९० दिवसांचा मध्यक, रुग्णालयांदरम्यानच्या हलवाहलवी वगळून.',
  'Probe vehicle travel time, weekday peak, averaged over eight weeks.':
    'चाचणी वाहनाचा प्रवासवेळ, कार्यदिवसांतील गर्दीची वेळ, आठ आठवड्यांची सरासरी.',
  'Audit of inspection records against the prescribed inspection proforma.':
    'विहित पाहणी नमुन्याच्या तुलनेत पाहणी नोंदींची लेखापरीक्षा.',
  'Camp attendance register against planned footfall, all camps, four quarters.':
    'नियोजित उपस्थितीच्या तुलनेत शिबिर हजेरी नोंदवही, सर्व शिबिरे, चार तिमाही.',
  'Complaint register timestamp to closure timestamp, six-month median.':
    'तक्रार नोंदवहीतील वेळनोंदीपासून काम बंद केल्याच्या वेळनोंदीपर्यंत, सहा महिन्यांचा मध्यक.',
  'Independent physical audit of a stratified 1,200-property sample.':
    'स्तरित १,२०० मालमत्तांच्या नमुन्याची स्वतंत्र प्रत्यक्ष लेखापरीक्षा.',

  /* ------------------------------------------------ where the figure comes from */
  'Depot fuel register and vehicle tracking logs': 'आगार इंधन नोंदवही व वाहन मागोवा नोंदी',
  'District agriculture office verification register': 'जिल्हा कृषी कार्यालय पडताळणी नोंदवही',
  'District education management information system': 'जिल्हा शिक्षण व्यवस्थापन माहिती प्रणाली',
  'Transfer station weighbridge and sort audit register':
    'हस्तांतरण केंद्र वजनकाटा व वर्गीकरण लेखापरीक्षा नोंदवही',
  'Ward counter register and notice generation system': 'प्रभाग खिडकी नोंदवही व सूचना निर्मिती प्रणाली',
  'Emergency response centre call log': 'आपत्कालीन प्रतिसाद केंद्र दूरध्वनी नोंद',
  'Traffic police corridor survey and probe data': 'वाहतूक पोलीस मार्गिका सर्वेक्षण व चाचणी माहिती',
  'Public works division inspection register': 'सार्वजनिक बांधकाम विभाग पाहणी नोंदवही',
  'Block health office camp register': 'गट आरोग्य कार्यालय शिबिर नोंदवही',
  'Electrical division complaint register': 'विद्युत विभाग तक्रार नोंदवही',
  'Assessment roll and independent audit sample': 'आकारणी नोंदवही व स्वतंत्र लेखापरीक्षा नमुना',

  /* -------------------------------------- the metric the outcome is set against */
  'Unexplained fuel draw': 'अस्पष्ट इंधन उपसा',
  'Time to verified field response': 'पडताळलेल्या क्षेत्रीय प्रतिसादापर्यंतचा वेळ',
  'Early identification rate': 'लवकर ओळखीचा दर',
  'Clean recyclable recovery': 'स्वच्छ पुनर्वापरयोग्य सामग्रीची प्राप्ती',
  'Counter visits for clarification': 'स्पष्टीकरणासाठी खिडकी-भेटी',
  'Median response time': 'मध्यक प्रतिसाद वेळ',
  'Peak corridor travel time': 'गर्दीच्या वेळचा मार्गिका प्रवासवेळ',
  'Complete inspection coverage': 'पूर्ण पाहणी व्याप्ती',
  'Camp utilisation': 'शिबिरांचा वापर',
  'Fault rectification time': 'बिघाड दुरुस्ती वेळ',
  'Assessment accuracy': 'आकारणीची अचूकता',
});
