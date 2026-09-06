import type { LanguageCode } from '@/i18n/languages';

/**
 * The programme’s published policies.
 *
 * They live in config, with every other rule the platform is bound by, for the
 * same reason the payment window and the relaxation thresholds do: a policy is
 * a document the programme owns and revises, not a paragraph somebody typed
 * into a page. One edit here changes what the site says, in every language, and
 * the revision date beside it.
 *
 * These describe how the production service would operate. This build is a
 * demonstration and every page that renders them says so at the top.
 */

/**
 * One string in every language the product is read in.
 *
 * All of them sit in the same record rather than in the translation bundles.
 * A clause and its translations are one decision — if they can be edited apart
 * they will drift apart, and a privacy policy that says three different things
 * in three languages is worse than one that says nothing.
 *
 * Every language is required rather than optional, so adding a fourth to
 * `LANGUAGES` and forgetting a paragraph here is a compile error rather than a
 * blank line in a published policy.
 */
export type Localised = Record<LanguageCode, string>;

export interface LegalSection {
  /** Anchor, and the key the contents rail is built from. */
  id: string;
  heading: Localised;
  body: readonly Localised[];
  /** Points that read better as a register than as prose. */
  list?: readonly { term: Localised; detail: Localised }[];
}

export interface LegalDocument {
  id: string;
  title: Localised;
  /** One line. Used as the page lead and as the footer’s description. */
  summary: Localised;
  /** The day this text last changed. */
  updated: string;
  sections: readonly LegalSection[];
}

export const LEGAL_DOCUMENTS: readonly LegalDocument[] = [
  /* ------------------------------------------------------------- privacy */
  {
    id: 'privacy',
    updated: '2026-08-14',
    title: { en: 'Privacy', hi: 'निजता', mr: 'गोपनीयता' },
    summary: {
      en: 'What the programme holds about you, why it holds it, and who inside it can see it.',
      hi: 'कार्यक्रम आपके बारे में क्या रखता है, क्यों रखता है, और उसके भीतर कौन उसे देख सकता है।',
      mr: 'कार्यक्रम तुमच्याबद्दल काय ठेवतो, का ठेवतो, आणि त्याच्या आत ते कोण पाहू शकते.',
    },
    sections: [
      {
        id: 'what',
        heading: { en: 'What is held', hi: 'क्या रखा जाता है', mr: 'काय ठेवले जाते' },
        body: [
          {
            en: 'Only what the work needs. Three kinds of record exist here, and they are kept apart from one another.',
            hi: 'केवल वही जो काम के लिए आवश्यक है। यहाँ तीन प्रकार के अभिलेख हैं, और वे एक-दूसरे से अलग रखे जाते हैं।',
            mr: 'कामासाठी जेवढे आवश्यक तेवढेच. येथे तीन प्रकारच्या नोंदी आहेत, आणि त्या एकमेकींपासून वेगळ्या ठेवल्या जातात.',
          },
        ],
        list: [
          {
            term: { en: 'Your account', hi: 'आपका खाता', mr: 'तुमचे खाते' },
            detail: {
              en: 'Name, work email address, designation, and the department or company you are registered against. This is what decides which cases you may open.',
              hi: 'नाम, कार्यालयी ईमेल पता, पदनाम, और वह विभाग या कंपनी जिसके अंतर्गत आप पंजीकृत हैं। यही तय करता है कि आप कौन-से प्रकरण खोल सकते हैं।',
              mr: 'नाव, कार्यालयीन ईमेल पत्ता, पदनाम, आणि तुम्ही ज्या विभागाखाली किंवा कंपनीखाली नोंदणीकृत आहात ती. तुम्ही कोणती प्रकरणे उघडू शकता हे यावरूनच ठरते.',
            },
          },
          {
            term: { en: 'What you file', hi: 'आप जो दाखिल करते हैं', mr: 'तुम्ही काय दाखल करता' },
            detail: {
              en: 'Applications, evidence, milestone submissions, clarifications, scores and decisions — with the account that filed them and the time they were filed.',
              hi: 'आवेदन, साक्ष्य, माइलस्टोन प्रस्तुतियाँ, स्पष्टीकरण, अंक और निर्णय — उस खाते और समय के साथ जिसने और जब उन्हें दाखिल किया।',
              mr: 'अर्ज, पुरावे, टप्पानिहाय सादरीकरणे, स्पष्टीकरणे, गुण आणि निर्णय — ती दाखल करणाऱ्या खात्यासह आणि दाखल केल्याच्या वेळेसह.',
            },
          },
          {
            term: { en: 'What you did', hi: 'आपने क्या किया', mr: 'तुम्ही काय केले' },
            detail: {
              en: 'An audit event for every decision, override and export. It records the act, the actor and the reason given. It is not a record of pages you read.',
              hi: 'प्रत्येक निर्णय, अधिक्रमण और निर्यात के लिए एक अंकेक्षण प्रविष्टि। इसमें कार्य, कर्ता और दिया गया कारण दर्ज होता है। यह पढ़े गए पृष्ठों का अभिलेख नहीं है।',
              mr: 'प्रत्येक निर्णय, बदल आणि निर्यातीसाठी एक लेखापरीक्षा नोंद. त्यात कृती, कर्ता आणि दिलेले कारण नोंदवले जाते. तुम्ही वाचलेल्या पृष्ठांची ही नोंद नाही.',
            },
          },
        ],
      },
      {
        id: 'why',
        heading: { en: 'Why it is held', hi: 'यह क्यों रखा जाता है', mr: 'हे का ठेवले जाते' },
        body: [
          {
            en: 'Public money moves through this platform against evidence, and a decision that cannot be traced back to a person, a reason and a date cannot be defended later. That is the whole purpose of the record.',
            hi: 'इस मंच के माध्यम से सार्वजनिक धन साक्ष्य के आधार पर हस्तांतरित होता है, और जिस निर्णय को किसी व्यक्ति, कारण और तिथि तक वापस नहीं जोड़ा जा सकता, उसका बाद में बचाव नहीं किया जा सकता। अभिलेख का यही एकमात्र उद्देश्य है।',
            mr: 'या मंचावरून सार्वजनिक पैसा पुराव्याच्या आधारे हलतो, आणि जो निर्णय एखाद्या व्यक्तीपर्यंत, कारणापर्यंत आणि तारखेपर्यंत मागे नेता येत नाही, त्याचे नंतर समर्थन करता येत नाही. नोंदीचा हाच एकमेव उद्देश आहे.',
          },
          {
            en: 'Nothing held here is used for advertising, sold, or shared with anyone outside the programme for a purpose other than the one it was collected for.',
            hi: 'यहाँ रखी गई कोई भी जानकारी विज्ञापन के लिए उपयोग नहीं होती, बेची नहीं जाती, और जिस उद्देश्य से एकत्र की गई थी उससे भिन्न किसी उद्देश्य हेतु कार्यक्रम के बाहर किसी के साथ साझा नहीं की जाती।',
            mr: 'येथे ठेवलेली कोणतीही माहिती जाहिरातीसाठी वापरली जात नाही, विकली जात नाही, आणि जी ज्या उद्देशाने गोळा केली त्याहून वेगळ्या उद्देशाने कार्यक्रमाबाहेरील कोणाशीही सामायिक केली जात नाही.',
          },
        ],
      },
      {
        id: 'who',
        heading: { en: 'Who can see it', hi: 'इसे कौन देख सकता है', mr: 'हे कोण पाहू शकते' },
        body: [
          {
            en: 'Not everyone with an account. A department officer sees their own department’s cases and no other department’s, an evaluator sees only the applications assigned to them by name, an independent validator sees a pilot only once its measurement window has closed, and a company sees its own record. The programme management unit can see all of it, because configuring the rules and auditing them being followed is what that role is for.',
            hi: 'खाता रखने वाला हर व्यक्ति नहीं। विभागीय अधिकारी केवल अपने विभाग के प्रकरण देखते हैं, किसी अन्य विभाग के नहीं; मूल्यांकनकर्ता केवल नाम से सौंपे गए आवेदन देखते हैं; स्वतंत्र सत्यापनकर्ता किसी पायलट को तभी देखते हैं जब उसकी मापन अवधि पूरी हो चुकी हो; और कंपनी अपना ही अभिलेख देखती है। कार्यक्रम प्रबंधन इकाई सब कुछ देख सकती है, क्योंकि नियम बनाना और उनका पालन जाँचना उसी भूमिका का काम है।',
            mr: 'खाते असलेला प्रत्येक जण नाही. विभागाचा अधिकारी स्वतःच्याच विभागाची प्रकरणे पाहतो, दुसऱ्या कोणत्याही विभागाची नाही; मूल्यांकनकर्ता केवळ नावाने नेमून दिलेले अर्ज पाहतो; स्वतंत्र पडताळणीकर्ता एखादा प्रायोगिक प्रकल्प त्याचा मापन कालावधी संपल्यावरच पाहतो; आणि कंपनी स्वतःचीच नोंद पाहते. कार्यक्रम व्यवस्थापन कक्ष हे सर्व पाहू शकतो, कारण नियम ठरवणे आणि त्यांचे पालन तपासणे हेच त्या भूमिकेचे काम आहे.',
          },
          {
            en: 'That boundary is enforced by the service, not by the pages. A link to a record outside your jurisdiction is refused however you arrived at it — from a notification, an alert, a bookmark or a link somebody sent you.',
            hi: 'यह सीमा पृष्ठों द्वारा नहीं, सेवा द्वारा लागू की जाती है। आपके क्षेत्राधिकार से बाहर के किसी अभिलेख का लिंक अस्वीकार कर दिया जाता है — चाहे आप सूचना, चेतावनी, बुकमार्क या किसी के भेजे लिंक से वहाँ पहुँचे हों।',
            mr: 'ही मर्यादा पृष्ठे नव्हे, तर सेवा लागू करते. तुमच्या अधिकारक्षेत्राबाहेरील नोंदीचा दुवा नाकारला जातो — तुम्ही तिथे सूचनेवरून, इशाऱ्यावरून, खुणेवरून किंवा कोणी पाठवलेल्या दुव्यावरून पोहोचला असलात तरी.',
          },
        ],
      },
      {
        id: 'published',
        heading: { en: 'What becomes public', hi: 'क्या सार्वजनिक होता है', mr: 'काय सार्वजनिक होते' },
        body: [
          {
            en: 'Some of it, deliberately. The challenge document, the rubric you would be marked against and the closing date are published because a tender nobody can read is not a tender. A validation report is published whether or not the pilot worked. Your application, your score sheet and your evidence are not published at any point.',
            hi: 'कुछ, जानबूझकर। चुनौती दस्तावेज़, वह मूल्यांकन-मानक जिस पर आपको अंक मिलेंगे, और अंतिम तिथि प्रकाशित होते हैं, क्योंकि जिसे कोई पढ़ ही न सके वह निविदा नहीं है। सत्यापन रिपोर्ट प्रकाशित होती है, चाहे पायलट सफल रहा हो या नहीं। आपका आवेदन, आपकी अंक-तालिका और आपका साक्ष्य कभी प्रकाशित नहीं होते।',
            mr: 'काही भाग, जाणीवपूर्वक. आव्हान दस्तऐवज, ज्या निकषांवर तुमचे गुणांकन होणार ते, आणि बंद होण्याची तारीख प्रकाशित केली जाते — कारण जी निविदा कोणी वाचूच शकत नाही ती निविदा नव्हे. प्रायोगिक प्रकल्प यशस्वी झाला असो वा नसो, पडताळणी अहवाल प्रकाशित होतो. तुमचा अर्ज, तुमचे गुणपत्रक आणि तुमचे पुरावे कधीही प्रकाशित होत नाहीत.',
          },
        ],
      },
      {
        id: 'browser',
        heading: { en: 'Your browser', hi: 'आपका ब्राउज़र', mr: 'तुमचा ब्राउझर' },
        body: [
          {
            en: 'This platform stores nothing on your device. No cookies are set for tracking, no local storage is written, and no third-party analytics or advertising script is loaded on any page. Your session lives on the service, and closing the tab ends it.',
            hi: 'यह मंच आपके उपकरण पर कुछ भी संचित नहीं करता। ट्रैकिंग के लिए कोई कुकी नहीं रखी जाती, कोई लोकल स्टोरेज नहीं लिखा जाता, और किसी भी पृष्ठ पर कोई तृतीय-पक्ष विश्लेषण या विज्ञापन स्क्रिप्ट लोड नहीं होती। आपका सत्र सेवा पर रहता है, और टैब बंद करते ही समाप्त हो जाता है।',
            mr: 'हा मंच तुमच्या उपकरणावर काहीही साठवत नाही. मागोवा घेण्यासाठी कुकीज ठेवल्या जात नाहीत, स्थानिक साठवण लिहिली जात नाही, आणि कोणत्याही पृष्ठावर तिसऱ्या पक्षाची विश्लेषण किंवा जाहिरात स्क्रिप्ट लोड होत नाही. तुमचे सत्र सेवेवर राहते, आणि टॅब बंद केल्यावर ते संपते.',
          },
        ],
      },
      {
        id: 'asking',
        heading: { en: 'Asking about your record', hi: 'अपने अभिलेख के बारे में पूछना', mr: 'तुमच्या नोंदीबद्दल विचारणे' },
        body: [
          {
            en: 'You can ask what is held about you, ask for a factual error to be corrected, and ask why a particular decision was taken. A decision record that has been signed cannot be edited — that is what makes it worth anything — but a correction can be entered against it, and it will be visible beside it.',
            hi: 'आप पूछ सकते हैं कि आपके बारे में क्या रखा गया है, किसी तथ्यात्मक त्रुटि के सुधार का अनुरोध कर सकते हैं, और यह पूछ सकते हैं कि कोई निर्णय क्यों लिया गया। हस्ताक्षरित निर्णय-अभिलेख संपादित नहीं किया जा सकता — इसी से उसका मूल्य है — किंतु उसके विरुद्ध शुद्धिपत्र दर्ज किया जा सकता है, जो उसी के साथ दिखाई देगा।',
            mr: 'तुमच्याबद्दल काय ठेवले आहे हे तुम्ही विचारू शकता, वस्तुस्थितीतील चूक दुरुस्त करण्याची मागणी करू शकता, आणि एखादा विशिष्ट निर्णय का घेतला गेला हे विचारू शकता. सही झालेली निर्णय-नोंद संपादित करता येत नाही — त्यामुळेच तिला काही किंमत आहे — पण तिच्यासमोर दुरुस्ती नोंदवता येते, आणि ती तिच्या शेजारी दिसते.',
          },
        ],
      },
    ],
  },

  /* --------------------------------------------------------------- terms */
  {
    id: 'terms',
    updated: '2026-08-14',
    title: { en: 'Terms of use', hi: 'उपयोग की शर्तें', mr: 'वापराच्या अटी' },
    summary: {
      en: 'The conditions you take part under, and what a decision recorded here does and does not commit anyone to.',
      hi: 'आप किन शर्तों पर भाग लेते हैं, और यहाँ दर्ज निर्णय किसे किस बात के लिए बाध्य करता है और किसे नहीं।',
      mr: 'तुम्ही कोणत्या अटींवर सहभागी होता, आणि येथे नोंदवलेला निर्णय कोणाला कशासाठी बांधून ठेवतो व कशासाठी ठेवत नाही.',
    },
    sections: [
      {
        id: 'who',
        heading: { en: 'Who may hold an account', hi: 'खाता कौन रख सकता है', mr: 'खाते कोण ठेवू शकते' },
        body: [
          {
            en: 'An account belongs to a person, not to a desk. Departmental accounts are issued against a posting and end when the posting does. Company accounts are held by a registered entity and are the responsibility of the person named on the registration.',
            hi: 'खाता किसी व्यक्ति का होता है, किसी पद का नहीं। विभागीय खाते पदस्थापना के आधार पर जारी होते हैं और पदस्थापना समाप्त होने पर समाप्त हो जाते हैं। कंपनी खाते किसी पंजीकृत इकाई के होते हैं और पंजीकरण में नामित व्यक्ति की जिम्मेदारी होते हैं।',
            mr: 'खाते व्यक्तीचे असते, पदाचे नाही. विभागीय खाती पदस्थापनेवर जारी होतात आणि पदस्थापना संपल्यावर संपतात. कंपनीची खाती नोंदणीकृत आस्थापनेकडे असतात आणि नोंदणीवर नाव असलेल्या व्यक्तीची ती जबाबदारी असते.',
          },
          {
            en: 'Credentials are not to be shared. Every act on this platform is attributed to the account that performed it, and that attribution is what a payment or a rejection later rests on.',
            hi: 'प्रमाण-पत्र साझा नहीं किए जाने चाहिए। इस मंच पर हर कार्य उस खाते के नाम दर्ज होता है जिसने वह किया, और आगे चलकर कोई भुगतान या अस्वीकृति उसी पर टिकती है।',
            mr: 'ओळखपत्रे सामायिक करायची नाहीत. या मंचावरील प्रत्येक कृती ती करणाऱ्या खात्याच्या नावे नोंदवली जाते, आणि पुढे एखादे प्रदान किंवा नकार याच नोंदीवर उभा राहतो.',
          },
        ],
      },
      {
        id: 'submissions',
        heading: { en: 'What you submit', hi: 'आप जो प्रस्तुत करते हैं', mr: 'तुम्ही काय सादर करता' },
        body: [
          {
            en: 'You are responsible for the accuracy of what you file, including baselines, measurements and evidence. A figure that cannot be reproduced from the records behind it is treated as unproven, and an independent validator will say so in a published report.',
            hi: 'आप जो दाखिल करते हैं उसकी सत्यता के लिए आप उत्तरदायी हैं, जिसमें आधाररेखा, मापन और साक्ष्य शामिल हैं। जिस आँकड़े को उसके पीछे के अभिलेखों से पुनः प्राप्त नहीं किया जा सकता, उसे असिद्ध माना जाता है, और स्वतंत्र सत्यापनकर्ता प्रकाशित रिपोर्ट में यही कहेगा।',
            mr: 'आधाररेखा, मापने आणि पुरावे धरून, तुम्ही जे दाखल करता त्याच्या अचूकतेस तुम्ही जबाबदार आहात. ज्या आकड्याची त्यामागील नोंदींवरून पुन्हा पडताळणी करता येत नाही तो असिद्ध मानला जातो, आणि स्वतंत्र पडताळणीकर्ता प्रकाशित अहवालात तसे नमूद करतो.',
          },
          {
            en: 'Knowingly filing a false claim, a forged document or an attestation you are not entitled to make ends the account and is reported to the department concerned.',
            hi: 'जानबूझकर मिथ्या दावा, कूटरचित दस्तावेज़ या ऐसा अभिप्रमाणन दाखिल करना जिसका आपको अधिकार नहीं है, खाता समाप्त कर देता है और संबंधित विभाग को सूचित किया जाता है।',
            mr: 'जाणूनबुजून खोटा दावा, बनावट दस्तऐवज किंवा तुम्हाला करण्याचा अधिकार नसलेले प्रमाणपत्र दाखल केल्यास खाते संपुष्टात येते आणि संबंधित विभागाला कळवले जाते.',
          },
        ],
      },
      {
        id: 'decisions',
        heading: { en: 'What a decision here means', hi: 'यहाँ लिए गए निर्णय का अर्थ', mr: 'येथील निर्णयाचा अर्थ काय' },
        body: [
          {
            en: 'A gate cleared on this platform is a recorded decision by a named officer, with its reason and its evidence attached. It is not a contract and it does not by itself commit money.',
            hi: 'इस मंच पर पारित कोई द्वार किसी नामित अधिकारी का दर्ज निर्णय है, जिसके साथ उसका कारण और साक्ष्य संलग्न हैं। वह अनुबंध नहीं है और स्वयं किसी धनराशि के लिए बाध्यता नहीं बनाता।',
            mr: 'या मंचावर पार झालेले द्वार म्हणजे नामनिर्देशित अधिकाऱ्याने नोंदवलेला निर्णय, त्याच्या कारणासह आणि पुराव्यासह. तो करार नाही आणि तो स्वतःहून पैसा बांधून ठेवत नाही.',
          },
          {
            en: 'A pilot is not a purchase. Passing validation at gate 5 does not create a right to be procured: the department must still take a separate, recorded pathway decision at gate 6, and re-tendering or closing the case are legitimate outcomes of it.',
            hi: 'पायलट कोई क्रय नहीं है। द्वार 5 पर सत्यापन उत्तीर्ण करने से खरीदे जाने का अधिकार नहीं बनता: विभाग को द्वार 6 पर अलग से, दर्ज किया गया मार्ग-निर्णय लेना होता है, और पुनर्निविदा या प्रकरण बंद करना भी उसके वैध परिणाम हैं।',
            mr: 'प्रायोगिक प्रकल्प म्हणजे खरेदी नव्हे. द्वार ५ ची पडताळणी उत्तीर्ण झाल्याने खरेदी होण्याचा हक्क निर्माण होत नाही: विभागाला द्वार ६ वर स्वतंत्र, नोंदवलेला मार्ग-निर्णय घ्यावाच लागतो, आणि पुनर्निविदा काढणे किंवा प्रकरण बंद करणे हेही त्याचे वैध परिणाम आहेत.',
          },
        ],
      },
      {
        id: 'relief',
        heading: { en: 'Relief is not a lower bar', hi: 'छूट का अर्थ निम्न मानक नहीं', mr: 'सवलत म्हणजे खालावलेली पातळी नव्हे' },
        body: [
          {
            en: 'Prior turnover and prior experience requirements may be relaxed for eligible startups, and where they are, the relaxation is recorded against the case. Technical capability, quality, safety, performance, cybersecurity and domain requirements are not relaxed, for anyone, at any point.',
            hi: 'पात्र स्टार्टअप के लिए पूर्व टर्नओवर और पूर्व अनुभव की शर्तों में छूट दी जा सकती है, और जहाँ दी जाती है वहाँ छूट प्रकरण के साथ दर्ज होती है। तकनीकी क्षमता, गुणवत्ता, सुरक्षा, निष्पादन, साइबर सुरक्षा और क्षेत्र-विशिष्ट अपेक्षाओं में किसी के लिए, कभी छूट नहीं दी जाती।',
            mr: 'पात्र स्टार्टअपसाठी पूर्वीची उलाढाल आणि पूर्वीच्या अनुभवाच्या अटी शिथिल करता येतात, आणि जिथे तसे केले जाते तिथे ती सवलत प्रकरणासमोर नोंदवली जाते. तांत्रिक क्षमता, गुणवत्ता, सुरक्षितता, कामगिरी, सायबर सुरक्षा आणि क्षेत्रविशिष्ट आवश्यकता कोणासाठीही, कधीही शिथिल केल्या जात नाहीत.',
          },
        ],
      },
      {
        id: 'availability',
        heading: { en: 'Availability and change', hi: 'उपलब्धता और परिवर्तन', mr: 'उपलब्धता आणि बदल' },
        body: [
          {
            en: 'Thresholds, windows, rubrics and clause text are configuration, and the programme changes them. A change applies to cases opened after it, never retrospectively to a decision already taken, and the version in force on the day of a decision is recorded with that decision.',
            hi: 'सीमाएँ, अवधियाँ, मूल्यांकन-मानक और खंड-पाठ विन्यास हैं, जिन्हें कार्यक्रम बदलता है। परिवर्तन उसके बाद खुले प्रकरणों पर लागू होता है, पहले लिए गए किसी निर्णय पर पूर्वप्रभावी रूप से कभी नहीं, और निर्णय के दिन प्रवृत्त संस्करण उस निर्णय के साथ दर्ज रहता है।',
            mr: 'मर्यादा, मुदती, निकष आणि कलमांचा मजकूर ही संरचना आहे, आणि कार्यक्रम ती बदलतो. बदल त्यानंतर उघडलेल्या प्रकरणांना लागू होतो, आधीच घेतलेल्या निर्णयाला पूर्वलक्ष्यी प्रभावाने कधीच नाही, आणि निर्णयाच्या दिवशी अंमलात असलेली आवृत्ती त्या निर्णयासोबत नोंदवली जाते.',
          },
        ],
      },
      {
        id: 'misuse',
        heading: { en: 'Misuse', hi: 'दुरुपयोग', mr: 'गैरवापर' },
        body: [
          {
            en: 'Attempting to reach records outside your jurisdiction, scraping the platform in bulk, or interfering with its operation suspends the account. The attempt itself is recorded.',
            hi: 'अपने क्षेत्राधिकार से बाहर के अभिलेखों तक पहुँचने का प्रयास, मंच से थोक में सामग्री खींचना, या उसके संचालन में बाधा डालना खाते को निलंबित कर देता है। प्रयास स्वयं अभिलेखित होता है।',
            mr: 'तुमच्या अधिकारक्षेत्राबाहेरील नोंदींपर्यंत पोहोचण्याचा प्रयत्न करणे, मंचावरून मोठ्या प्रमाणात माहिती ओरबाडणे, किंवा त्याच्या कामकाजात अडथळा आणणे यामुळे खाते निलंबित होते. प्रयत्न स्वतःच नोंदवला जातो.',
          },
        ],
      },
    ],
  },

  /* ----------------------------------------------------------- copyright */
  {
    id: 'copyright',
    updated: '2026-08-14',
    title: { en: 'Copyright and reuse', hi: 'कॉपीराइट और पुनरुपयोग', mr: 'प्रताधिकार आणि पुनर्वापर' },
    summary: {
      en: 'Who owns what is published here, what you may do with it, and why the startup keeps its own intellectual property.',
      hi: 'यहाँ प्रकाशित सामग्री का स्वामी कौन है, आप उसके साथ क्या कर सकते हैं, और स्टार्टअप अपनी बौद्धिक संपदा क्यों बनाए रखता है।',
      mr: 'येथे प्रकाशित होणाऱ्या गोष्टींची मालकी कोणाची, त्यांचे तुम्ही काय करू शकता, आणि स्टार्टअप स्वतःची बौद्धिक संपदा का राखतो.',
    },
    sections: [
      {
        id: 'material',
        heading: { en: 'Material published by the programme', hi: 'कार्यक्रम द्वारा प्रकाशित सामग्री', mr: 'कार्यक्रमाने प्रकाशित केलेली सामग्री' },
        body: [
          {
            en: 'Challenge documents, rubrics, template agreements, clause libraries, validation reports and programme statistics are published by the departments and the programme management unit, and may be reproduced free of charge in any medium.',
            hi: 'चुनौती दस्तावेज़, मूल्यांकन-मानक, आदर्श अनुबंध, खंड-संग्रह, सत्यापन रिपोर्ट और कार्यक्रम के आँकड़े विभागों तथा कार्यक्रम प्रबंधन इकाई द्वारा प्रकाशित किए जाते हैं, और किसी भी माध्यम में नि:शुल्क पुनरुत्पादित किए जा सकते हैं।',
            mr: 'आव्हान दस्तऐवज, मूल्यांकन निकष, नमुना करार, कलम-संग्रह, पडताळणी अहवाल आणि कार्यक्रमाची आकडेवारी हे विभाग व कार्यक्रम व्यवस्थापन कक्ष प्रकाशित करतात, आणि ते कोणत्याही माध्यमात विनामूल्य पुनःप्रकाशित करता येतात.',
          },
          {
            en: 'Two conditions: reproduce it accurately and not in a misleading context, and name the source with the case identifier and the date it was published. Do not present reproduced material as an endorsement by the department.',
            hi: 'दो शर्तें: उसे यथावत् और भ्रामक संदर्भ के बिना पुनरुत्पादित करें, तथा स्रोत को प्रकरण-संख्या और प्रकाशन तिथि सहित नामित करें। पुनरुत्पादित सामग्री को विभाग के अनुमोदन के रूप में प्रस्तुत न करें।',
            mr: 'दोन अटी: ते अचूकपणे आणि दिशाभूल करणाऱ्या संदर्भाशिवाय पुनःप्रकाशित करा, आणि प्रकरण ओळख क्रमांक व प्रकाशनाच्या तारखेसह स्रोताचे नाव द्या. पुनःप्रकाशित सामग्री विभागाचे समर्थन असल्यासारखी मांडू नका.',
          },
        ],
      },
      {
        id: 'your-ip',
        heading: { en: 'Your intellectual property', hi: 'आपकी बौद्धिक संपदा', mr: 'तुमची बौद्धिक संपदा' },
        body: [
          {
            en: 'The startup keeps ownership of its intellectual property. Everything you bring to a pilot, and everything you build during it, stays yours.',
            hi: 'स्टार्टअप अपनी बौद्धिक संपदा का स्वामित्व बनाए रखता है। आप जो कुछ पायलट में लाते हैं और जो कुछ उसके दौरान बनाते हैं, वह आपका ही रहता है।',
            mr: 'स्टार्टअप स्वतःच्या बौद्धिक संपदेची मालकी राखतो. तुम्ही प्रायोगिक प्रकल्पात जे आणता आणि त्यादरम्यान जे बांधता, ते सर्व तुमचेच राहते.',
          },
          {
            en: 'Government receives a defined Government Purpose Licence: the right to use the solution for the purposes and within the departments named in the agreement. It does not include a right to resell it, to license it onward commercially, or to hand your source or your models to another supplier. The clause in force is in the template library, at the version attached to your contract.',
            hi: 'सरकार को एक परिभाषित शासकीय प्रयोजन अनुज्ञप्ति मिलती है: अनुबंध में नामित प्रयोजनों और विभागों के भीतर समाधान का उपयोग करने का अधिकार। इसमें उसे पुनर्विक्रय करने, आगे वाणिज्यिक अनुज्ञप्ति देने, या आपका स्रोत-कोड अथवा मॉडल किसी अन्य आपूर्तिकर्ता को सौंपने का अधिकार सम्मिलित नहीं है। प्रवृत्त खंड आदर्श-अनुबंध संग्रह में है, उसी संस्करण में जो आपके अनुबंध के साथ संलग्न है।',
            mr: 'शासनाला एक निश्चित शासकीय प्रयोजन परवाना मिळतो: करारात नमूद केलेल्या प्रयोजनांसाठी आणि विभागांमध्ये तो उपाय वापरण्याचा अधिकार. त्यात तो पुन्हा विकण्याचा, व्यावसायिकरीत्या पुढे परवाना देण्याचा, किंवा तुमचा स्रोत अथवा तुमची प्रारूपे दुसऱ्या पुरवठादाराकडे सोपवण्याचा अधिकार नाही. अंमलात असलेले कलम नमुना संग्रहात आहे, तुमच्या करारासोबत जोडलेल्या आवृत्तीत.',
          },
        ],
      },
      {
        id: 'data',
        heading: { en: 'Departmental data', hi: 'विभागीय आँकड़े', mr: 'विभागीय माहिती' },
        body: [
          {
            en: 'Data a department gives you for a pilot remains the department’s. It is provided at a stated tier — synthetic, masked or production — for a stated purpose and a stated period, and it does not become yours to keep, publish or train on beyond what the sandbox agreement says.',
            hi: 'पायलट के लिए विभाग द्वारा दिए गए आँकड़े विभाग के ही रहते हैं। वे एक घोषित स्तर पर — कृत्रिम, आच्छादित या उत्पादन — घोषित प्रयोजन और घोषित अवधि के लिए दिए जाते हैं, और सैंडबॉक्स अनुबंध में कही गई सीमा से आगे उन्हें रखने, प्रकाशित करने या उन पर प्रशिक्षण देने का अधिकार आपको नहीं मिलता।',
            mr: 'प्रायोगिक प्रकल्पासाठी विभाग तुम्हाला जी माहिती देतो ती विभागाचीच राहते. ती ठरलेल्या स्तरावर — कृत्रिम, आच्छादित किंवा प्रत्यक्ष — ठरलेल्या प्रयोजनासाठी आणि ठरलेल्या कालावधीसाठी दिली जाते, आणि सँडबॉक्स करार जे सांगतो त्यापलीकडे ती ठेवणे, प्रकाशित करणे किंवा तिच्यावर प्रशिक्षण देणे तुमच्या अधिकारात येत नाही.',
          },
        ],
      },
      {
        id: 'marks',
        heading: { en: 'Names, emblems and marks', hi: 'नाम, प्रतीक और चिह्न', mr: 'नावे, बोधचिन्हे आणि खुणा' },
        body: [
          {
            en: 'Departmental names, state emblems and the programme’s own mark are not covered by the reuse permission above and may not be used to suggest an association that does not exist. A company that has completed a validated pilot may state that factually, citing the case identifier.',
            hi: 'विभागीय नाम, राज्य-प्रतीक और कार्यक्रम का अपना चिह्न ऊपर दी गई पुनरुपयोग अनुमति के अंतर्गत नहीं आते और उनका उपयोग ऐसा संबंध दर्शाने के लिए नहीं किया जा सकता जो है ही नहीं। जिस कंपनी ने सत्यापित पायलट पूरा किया है, वह प्रकरण-संख्या का उल्लेख करते हुए यह तथ्य बता सकती है।',
            mr: 'विभागांची नावे, राज्य बोधचिन्हे आणि कार्यक्रमाची स्वतःची खूण वरील पुनर्वापर परवानगीत येत नाहीत, आणि अस्तित्वात नसलेला संबंध सुचवण्यासाठी त्यांचा वापर करता येणार नाही. पडताळलेला प्रायोगिक प्रकल्प पूर्ण केलेली कंपनी प्रकरण ओळख क्रमांकाचा संदर्भ देऊन तसे वस्तुस्थितीदर्शक विधान करू शकते.',
          },
        ],
      },
    ],
  },

  /* ------------------------------------------------------- accessibility */
  {
    id: 'accessibility',
    updated: '2026-08-14',
    title: { en: 'Accessibility', hi: 'सुगम्यता', mr: 'सुलभता' },
    summary: {
      en: 'What this site is built to, what is known not to work yet, and how to tell the programme it failed you.',
      hi: 'यह साइट किस मानक पर बनी है, अभी क्या काम नहीं करता, और यदि वह आपके लिए विफल रही तो कार्यक्रम को कैसे बताएँ।',
      mr: 'हे संकेतस्थळ कोणत्या मानकानुसार बांधले आहे, अजून काय चालत नाही हे ज्ञात आहे, आणि ते तुम्हाला अपुरे पडल्यास कार्यक्रमाला कसे कळवायचे.',
    },
    sections: [
      {
        id: 'standard',
        heading: { en: 'The standard', hi: 'मानक', mr: 'मानक' },
        body: [
          {
            en: 'This platform aims at WCAG 2.1 Level AA and at the Guidelines for Indian Government Websites. A procurement notice that some applicants cannot read has narrowed the field before anyone has applied, which is the one thing this programme exists to stop.',
            hi: 'यह मंच WCAG 2.1 स्तर AA तथा भारतीय सरकारी वेबसाइटों के दिशानिर्देशों को लक्ष्य करता है। जिस खरीद-सूचना को कुछ आवेदक पढ़ ही न सकें, वह आवेदन आने से पहले ही क्षेत्र संकुचित कर देती है — और यही रोकने के लिए यह कार्यक्रम है।',
            mr: 'हा मंच WCAG 2.1 Level AA आणि भारतीय शासकीय संकेतस्थळांसाठीच्या मार्गदर्शक तत्त्वांचे लक्ष्य ठेवतो. जी खरेदी सूचना काही अर्जदार वाचूच शकत नाहीत, तिने कोणी अर्ज करण्यापूर्वीच स्पर्धा संकुचित केलेली असते — आणि नेमके तेच थांबवण्यासाठी हा कार्यक्रम आहे.',
          },
        ],
      },
      {
        id: 'built',
        heading: { en: 'What is built in', hi: 'क्या अंतर्निहित है', mr: 'यात काय बांधलेले आहे' },
        body: [],
        list: [
          {
            term: { en: 'A keyboard path through everything', hi: 'हर चीज़ तक कुंजीपटल से पहुँच', mr: 'प्रत्येक गोष्टीपर्यंत कळफलकाने पोहोचण्याचा मार्ग' },
            detail: {
              en: 'Every control can be reached and used without a mouse, with a visible focus ring, and a skip link at the top of each page.',
              hi: 'हर नियंत्रण माउस के बिना पहुँचा और प्रयोग किया जा सकता है, दृश्यमान फ़ोकस-वलय के साथ, और हर पृष्ठ के शीर्ष पर छोड़-कर-जाएँ लिंक है।',
              mr: 'प्रत्येक नियंत्रण माउसशिवाय गाठता येते आणि वापरता येते, दिसणाऱ्या केंद्रबिंदू-वलयासह, आणि प्रत्येक पृष्ठाच्या वर एक वगळण्याचा दुवा आहे.',
            },
          },
          {
            term: { en: 'A table behind every chart', hi: 'हर चित्र के पीछे एक तालिका', mr: 'प्रत्येक आलेखामागे एक तक्ता' },
            detail: {
              en: 'No figure is available only as a picture. Each chart has the numbers it was drawn from beside it.',
              hi: 'कोई आँकड़ा केवल चित्र के रूप में नहीं है। हर चित्र के साथ वे संख्याएँ हैं जिनसे वह बना है।',
              mr: 'कोणताही आकडा केवळ चित्ररूपातच उपलब्ध नाही. प्रत्येक आलेखाशेजारी तो ज्या आकड्यांवरून काढला ते आकडे आहेत.',
            },
          },
          {
            term: { en: 'Never colour alone', hi: 'केवल रंग कभी नहीं', mr: 'केवळ रंगावर कधीही नाही' },
            detail: {
              en: 'A status, a gate and an overdue clock all carry a word as well as a colour.',
              hi: 'स्थिति, द्वार और विलंब-घड़ी — तीनों रंग के साथ शब्द भी रखते हैं।',
              mr: 'स्थिती, द्वार आणि मुदत उलटल्याचे घड्याळ — हे सर्व रंगासोबत शब्दही वाहून नेतात.',
            },
          },
          {
            term: { en: 'Motion you can turn off', hi: 'गति जिसे बंद किया जा सके', mr: 'बंद करता येणारी हालचाल' },
            detail: {
              en: 'Every transition and every automatic advance respects your system’s reduced-motion setting.',
              hi: 'प्रत्येक संक्रमण और प्रत्येक स्वचालित परिवर्तन आपके तंत्र की कम-गति सेटिंग का पालन करता है।',
              mr: 'प्रत्येक संक्रमण आणि प्रत्येक आपोआप होणारी पुढची पायरी तुमच्या प्रणालीतील कमी-हालचाल सेटिंगचा मान राखते.',
            },
          },
          {
            term: { en: 'Three languages', hi: 'तीन भाषाएँ', mr: 'तीन भाषा' },
            detail: {
              en: 'English, Hindi and Marathi throughout the interface. Text authored by a department — a challenge title, an outcome statement — appears in the language it was written in.',
              hi: 'पूरे इंटरफ़ेस में अंग्रेज़ी, हिंदी और मराठी। विभाग द्वारा लिखा गया पाठ — चुनौती का शीर्षक, परिणाम-कथन — उसी भाषा में दिखता है जिसमें वह लिखा गया था।',
              mr: 'संपूर्ण इंटरफेसमध्ये इंग्रजी, हिंदी आणि मराठी. विभागाने लिहिलेला मजकूर — आव्हानाचे शीर्षक, निष्पत्तीचे विधान — तो ज्या भाषेत लिहिला गेला त्याच भाषेत दिसतो.',
            },
          },
        ],
      },
      {
        id: 'gaps',
        heading: { en: 'Known gaps', hi: 'ज्ञात कमियाँ', mr: 'ज्ञात त्रुटी' },
        body: [
          {
            en: 'Exported documents are not yet tagged for screen readers, and a few dense comparison tables are hard to follow at very high zoom. Both are being worked on. Listing them is more useful than claiming full conformance.',
            hi: 'निर्यात किए गए दस्तावेज़ अभी स्क्रीन रीडर के लिए टैग नहीं किए गए हैं, और कुछ सघन तुलना-तालिकाएँ अत्यधिक आवर्धन पर पढ़ना कठिन है। दोनों पर काम चल रहा है। पूर्ण अनुपालन का दावा करने से बेहतर है इन्हें सूचीबद्ध करना।',
            mr: 'निर्यात केलेले दस्तऐवज अद्याप पडदावाचकांसाठी चिन्हांकित केलेले नाहीत, आणि काही दाट तुलना-तक्ते खूप मोठ्या विवर्धनावर समजायला कठीण जातात. दोन्हींवर काम सुरू आहे. संपूर्ण अनुपालनाचा दावा करण्यापेक्षा त्या नोंदवणे अधिक उपयुक्त आहे.',
          },
        ],
      },
      {
        id: 'report',
        heading: { en: 'If something here failed you', hi: 'यदि यहाँ कुछ आपके लिए विफल रहा', mr: 'येथे काही तुम्हाला अपुरे पडले असेल तर' },
        body: [
          {
            en: 'Tell the programme management unit what you were trying to do, on which page, and what got in the way. A barrier that stopped you filing something before a deadline is treated as a reason to extend that deadline, not as your problem.',
            hi: 'कार्यक्रम प्रबंधन इकाई को बताएँ कि आप क्या करना चाह रहे थे, किस पृष्ठ पर, और क्या बाधा बनी। जिस अवरोध के कारण आप समय-सीमा से पहले कुछ दाखिल नहीं कर सके, उसे समय-सीमा बढ़ाने का कारण माना जाता है, आपकी समस्या नहीं।',
            mr: 'तुम्ही काय करू पाहत होता, कोणत्या पृष्ठावर, आणि काय आडवे आले, हे कार्यक्रम व्यवस्थापन कक्षाला सांगा. मुदतीपूर्वी काही दाखल करण्यापासून तुम्हाला रोखणारा अडथळा ही तुमची अडचण मानली जात नाही, तर ती मुदत वाढवण्याचे कारण मानली जाते.',
          },
        ],
      },
    ],
  },

  /* ---------------------------------------------------------- disclaimer */
  {
    id: 'disclaimer',
    updated: '2026-08-14',
    title: { en: 'Disclaimer', hi: 'अस्वीकरण', mr: 'अस्वीकरण' },
    summary: {
      en: 'What this build is, what the figures in it are, and what none of it should be relied on for.',
      hi: 'यह संस्करण क्या है, इसमें दिए आँकड़े क्या हैं, और किस बात के लिए इनमें से किसी पर भरोसा नहीं किया जाना चाहिए।',
      mr: 'हे बांधकाम काय आहे, यातील आकडे काय आहेत, आणि यांपैकी कशावरही कशासाठी विसंबून राहू नये.',
    },
    sections: [
      {
        id: 'demonstration',
        heading: { en: 'This is a demonstration build', hi: 'यह एक प्रदर्शन संस्करण है', mr: 'हे एक प्रात्यक्षिक बांधकाम आहे' },
        body: [
          {
            en: 'PRAYOG as shown here is a working demonstration of an innovation-procurement platform. It is not operated by any government department, no live procurement runs through it, and no notice on it is a notice inviting tenders.',
            hi: 'यहाँ दिखाया गया प्रयोग नवाचार-खरीद मंच का एक कार्यशील प्रदर्शन है। इसका संचालन किसी सरकारी विभाग द्वारा नहीं होता, इसके माध्यम से कोई वास्तविक खरीद नहीं चलती, और इस पर कोई सूचना निविदा-आमंत्रण नहीं है।',
            mr: 'येथे दाखवलेले प्रयोग हे नवोपक्रम-खरेदी मंचाचे चालते प्रात्यक्षिक आहे. ते कोणत्याही शासकीय विभागाकडून चालवले जात नाही, त्यातून कोणतीही प्रत्यक्ष खरेदी होत नाही, आणि त्यावरील कोणतीही सूचना ही निविदा आमंत्रित करणारी सूचना नाही.',
          },
          {
            en: 'Every department, company, officer, case, figure and date on this site is seeded example data, constructed to make the workflow legible. Any resemblance to a real procurement is illustrative.',
            hi: 'इस साइट पर प्रत्येक विभाग, कंपनी, अधिकारी, प्रकरण, आँकड़ा और तिथि उदाहरण हेतु रचित आँकड़े हैं, जो कार्यप्रवाह को समझने योग्य बनाने के लिए बनाए गए हैं। किसी वास्तविक खरीद से समानता केवल दृष्टांत-मात्र है।',
            mr: 'या संकेतस्थळावरील प्रत्येक विभाग, कंपनी, अधिकारी, प्रकरण, आकडा आणि तारीख हा कार्यप्रवाह समजावा म्हणून तयार केलेला पेरलेला उदाहरणादाखल तपशील आहे. प्रत्यक्ष खरेदीशी साम्य आढळल्यास ते केवळ दृष्टान्तापुरते आहे.',
          },
        ],
      },
      {
        id: 'integrations',
        heading: { en: 'Government integrations are mock providers', hi: 'सरकारी एकीकरण नकली प्रदाता हैं', mr: 'शासकीय एकात्मीकरणे ही बनावट पुरवठादार आहेत' },
        body: [
          {
            en: 'Where this platform shows a check against a government register — startup recognition, entity details, a payment gateway — it is calling a mock provider inside the demonstration, and every such surface says so where it appears. No live government API is contacted.',
            hi: 'जहाँ यह मंच किसी सरकारी रजिस्टर के विरुद्ध जाँच दिखाता है — स्टार्टअप मान्यता, इकाई विवरण, भुगतान द्वार — वहाँ वह प्रदर्शन के भीतर एक नकली प्रदाता को पुकार रहा है, और ऐसा हर स्थान वहीं यह बात कहता है। किसी वास्तविक सरकारी API से संपर्क नहीं होता।',
            mr: 'हा मंच जिथे शासकीय नोंदवहीविरुद्ध तपासणी दाखवतो — स्टार्टअप मान्यता, आस्थापनेचे तपशील, प्रदान प्रवेशद्वार — तिथे तो प्रात्यक्षिकातील बनावट पुरवठादाराला विचारत असतो, आणि असा प्रत्येक भाग तिथेच तसे सांगतो. कोणताही प्रत्यक्ष शासकीय API संपर्कात येत नाही.',
          },
          {
            en: 'Signatures, seals and checksums shown here are demonstration records. They are not legally executed instruments.',
            hi: 'यहाँ दिखाए गए हस्ताक्षर, मुहरें और चेकसम प्रदर्शन-अभिलेख हैं। वे विधिक रूप से निष्पादित लिखत नहीं हैं।',
            mr: 'येथे दाखवलेल्या सह्या, शिक्के आणि पडताळणी-अंक ही प्रात्यक्षिक नोंदी आहेत. ती कायदेशीररीत्या अंमलात आणलेली साधने नाहीत.',
          },
        ],
      },
      {
        id: 'advice',
        heading: { en: 'Not advice', hi: 'यह परामर्श नहीं है', mr: 'हा सल्ला नाही' },
        body: [
          {
            en: 'Nothing on this site is legal, financial, tax or procurement advice. The clause text, thresholds and policy citations shown are illustrative configuration for the demonstration, and are not a statement of the law in force in any jurisdiction.',
            hi: 'इस साइट पर कुछ भी विधिक, वित्तीय, कर या खरीद-संबंधी परामर्श नहीं है। दिखाए गए खंड-पाठ, सीमाएँ और नीति-उद्धरण प्रदर्शन हेतु दृष्टांतात्मक विन्यास हैं, और किसी भी क्षेत्राधिकार में प्रवृत्त विधि का कथन नहीं हैं।',
            mr: 'या संकेतस्थळावरील काहीही कायदेशीर, आर्थिक, कर अथवा खरेदीविषयक सल्ला नाही. दाखवलेला कलम-मजकूर, मर्यादा आणि धोरण-संदर्भ ही प्रात्यक्षिकासाठीची दृष्टान्तात्मक संरचना आहे, आणि कोणत्याही अधिकारक्षेत्रात अंमलात असलेल्या कायद्याचे ते विधान नाही.',
          },
        ],
      },
      {
        id: 'links',
        heading: { en: 'Links away from here', hi: 'यहाँ से बाहर के लिंक', mr: 'येथून बाहेर जाणारे दुवे' },
        body: [
          {
            en: 'Where this site links to another, the programme is not responsible for that site’s content or its availability, and a link is not an endorsement.',
            hi: 'जहाँ यह साइट किसी अन्य साइट से जोड़ती है, वहाँ उस साइट की सामग्री या उपलब्धता के लिए कार्यक्रम उत्तरदायी नहीं है, और लिंक कोई अनुमोदन नहीं है।',
            mr: 'हे संकेतस्थळ दुसऱ्या संकेतस्थळाशी जोडते तिथे, त्या संकेतस्थळावरील मजकुरासाठी किंवा त्याच्या उपलब्धतेसाठी कार्यक्रम जबाबदार नाही, आणि दुवा म्हणजे समर्थन नव्हे.',
          },
        ],
      },
    ],
  },
] as const;

export function legalDocument(id: string | undefined): LegalDocument | undefined {
  return LEGAL_DOCUMENTS.find((d) => d.id === id);
}

export const legalPath = (id: string): string => `/legal/${id}`;
