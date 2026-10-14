import type { Dictionary } from "./de";

export const en: Dictionary = {
  meta: {
    title: "Fiduciary services for SMEs, the self-employed and individuals",
    description:
      "Bookkeeping, annual accounts, taxes, payroll and company formation in Switzerland – jera takes care of your numbers so you can focus on your business.",
  },
  nav: {
    services: "Services",
    deadlines: "Deadlines",
    process: "Process",
    faq: "FAQ",
    contact: "Contact",
    cta: "Request a first meeting",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    skip: "Skip to content",
    home: "Home",
    language: "Language",
    theme: {
      label: "Appearance",
      light: "Light",
      dark: "Dark",
      system: "System",
    },
  },
  hero: {
    title: "Bookkeeping, taxes and payroll. Done properly, filed on time.",
    lead: "jera is a Swiss fiduciary office for SMEs, the self-employed and private individuals. We keep your books, prepare annual accounts and tax returns, and keep track of every deadline.",
    primary: "Request a first meeting",
    secondary: "See services",
    sheetTitle: "Year-end closing",
    sheetSub: "Checklist",
    checklist: [
      "Receipts recorded and coded",
      "Bank accounts reconciled",
      "VAT return filed",
      "Payroll and social security reported",
      "Annual accounts prepared",
      "Tax return submitted",
    ],
  },
  services: {
    title: "Services",
    intro:
      "Four areas, one point of contact. You decide what we take on – from a single set of annual accounts to your complete administration.",
    more: "More about",
    included: "What we take care of",
    needs: "What we need from you",
    related: "Key dates",
    request: "Request a quote",
    back: "All services",
    items: [
      {
        slug: "buchhaltung",
        title: "Bookkeeping & accounts",
        short:
          "Ongoing bookkeeping, annual accounts under Swiss law and clear reporting.",
        intro:
          "Clean books are the basis for every decision, every tax return and every conversation with your bank. We keep your books throughout the year or only prepare the annual accounts – depending on how much you want to do yourself.",
        includes: [
          "Ongoing financial accounting incl. receivables and payables",
          "Bank reconciliations and coding of receipts",
          "Annual accounts with balance sheet, income statement and notes under the Swiss Code of Obligations",
          "Interim accounts and reports on request",
          "Help choosing and setting up accounting software",
        ],
        needs: [
          "Bank and credit card statements",
          "Invoices and receipts (digital or paper)",
          "Inventory and receivables lists as of the balance sheet date",
          "Previous year's accounts, if available",
        ],
        months: [5, 11],
      },
      {
        slug: "steuern",
        title: "Taxes",
        short:
          "Tax returns for individuals and companies, VAT returns and tax planning.",
        intro:
          "Swiss taxes are regulated by each canton, and forms and deadlines change. We prepare your tax return, review the assessment and show you where legal options exist.",
        includes: [
          "Tax returns for individuals",
          "Tax returns for companies",
          "VAT returns and clarification of VAT liability",
          "Review of the tax assessment",
          "Deadline extensions and correspondence with the tax office",
          "Tax planning, e.g. for pillar 3a or pension fund buy-ins",
        ],
        needs: [
          "Forms or access code from the tax office",
          "Salary statements",
          "Bank and custody account statements as of 31 December",
          "Receipts for deductions (pillar 3a, medical costs, training etc.)",
          "Most recent tax assessment",
        ],
        months: [1, 2, 4, 7, 10, 11],
      },
      {
        slug: "lohn",
        title: "Payroll & HR",
        short:
          "Payslips, social security, salary statements and HR administration.",
        intro:
          "Salaries have to be paid correctly and on time every month – with all deductions for AHV, IV, EO, ALV, occupational pension and accident insurance. We run your entire payroll or complement your in-house solution.",
        includes: [
          "Monthly payslips and payment files",
          "Registrations and settlements with social insurance funds",
          "Withholding tax returns",
          "Salary statements and annual reports",
          "Employment contracts, references and certificates",
        ],
        needs: [
          "Personal details of new employees",
          "Employment contracts and salary changes",
          "Absences, overtime and expenses",
          "Social and accident insurance contracts",
        ],
        months: [0],
      },
      {
        slug: "gruendung",
        title: "Formation & advisory",
        short:
          "Company formation, choice of legal form, succession planning and business advice.",
        intro:
          "Sole proprietorship, GmbH or AG: the legal form affects liability, taxes and social security. We guide you from the idea to the entry in the commercial register – and later on with major decisions.",
        includes: [
          "Advice on the right legal form",
          "Formation of a sole proprietorship, GmbH or AG incl. commercial register",
          "Registration with AHV, VAT and insurers",
          "Business plan and budget",
          "Succession planning and restructuring",
        ],
        needs: [
          "Business idea and planned activities",
          "Details of the founders",
          "Planned capital and registered office",
        ],
        months: [5],
      },
    ],
  },
  deadlines: {
    title: "The fiduciary year",
    intro:
      "These dates come around every year. Pick a month to see what is due.",
    note: "Typical dates for companies whose financial year equals the calendar year and that file VAT quarterly. Cantonal deadlines may differ.",
    current: "current month",
    next: "Coming up",
    months: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    monthsShort: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    empty:
      "No recurring deadlines – a good month for interim accounts and keeping the books up to date.",
    entries: {
      0: [
        {
          tag: "Payroll",
          title: "Issue salary statements",
          text: "Employees receive their salary statement for the previous year so they can complete their tax return.",
        },
        {
          tag: "Payroll",
          title: "Salary report to the compensation fund",
          text: "The AHV salary declaration for the previous year is due by 30 January.",
        },
      ],
      1: [
        {
          tag: "VAT",
          title: "VAT return Q4",
          text: "Return and payment due within 60 days of the end of the quarter.",
        },
        {
          tag: "Taxes",
          title: "Tax return arrives",
          text: "Forms for individuals are sent out or made available online.",
        },
      ],
      2: [
        {
          tag: "Taxes",
          title: "Tax return for individuals",
          text: "In many cantons the tax return is due at the end of March. An extension is usually possible.",
        },
      ],
      4: [
        {
          tag: "VAT",
          title: "VAT return Q1",
          text: "Return and payment due within 60 days of the end of the quarter.",
        },
      ],
      5: [
        {
          tag: "Accounts",
          title: "General meeting",
          text: "An AG or GmbH approves its annual accounts within six months of the end of the financial year.",
        },
      ],
      7: [
        {
          tag: "VAT",
          title: "VAT return Q2",
          text: "Return and payment due within 60 days of the end of the quarter.",
        },
      ],
      10: [
        {
          tag: "VAT",
          title: "VAT return Q3",
          text: "Return and payment due within 60 days of the end of the quarter.",
        },
        {
          tag: "Taxes",
          title: "Tax planning before year end",
          text: "There is still time to influence what goes into this year's tax return.",
        },
      ],
      11: [
        {
          tag: "Taxes",
          title: "Pillar 3a contribution",
          text: "Only contributions credited by 31 December count for the current tax year.",
        },
        {
          tag: "Accounts",
          title: "Prepare for year end",
          text: "Take inventory, check open invoices and gather receipts for the annual accounts.",
        },
      ],
    },
  },
  process: {
    title: "How we work together",
    intro: "From the first conversation to ongoing support in four steps.",
    steps: [
      {
        title: "First meeting",
        text: "You describe your situation; we clarify what you need and what you want to handle yourself.",
      },
      {
        title: "Quote",
        text: "You receive a written quote with a clearly defined scope.",
      },
      {
        title: "Handover",
        text: "You hand over receipts and access – digital or on paper. We tell you exactly what we need.",
      },
      {
        title: "Ongoing support",
        text: "We do the agreed work, keep track of deadlines and get in touch when something is due.",
      },
    ],
  },
  about: {
    title: "About us",
    team: "Team",
    memberships: "Memberships",
  },
  faq: {
    title: "Frequently asked questions",
    items: [
      {
        q: "When does my business have to register for VAT?",
        a: "As a rule, a business becomes liable for VAT once it generates at least CHF 100,000 in turnover from taxable supplies within a year. Different thresholds apply to certain organisations. We check your situation and handle the registration.",
      },
      {
        q: "Sole proprietorship or GmbH – which suits me?",
        a: "As a sole proprietor you are liable with your private assets, but formation is simple and inexpensive. A GmbH requires at least CHF 20,000 in share capital, but liability is limited to the company's assets. The right choice also depends on taxes, social security and your plans – we work this out together.",
      },
      {
        q: "Does my GmbH or AG need an audit?",
        a: "Smaller companies with no more than ten full-time positions on annual average can waive the limited audit with the consent of all shareholders (opting out). Larger companies must be audited.",
      },
      {
        q: "How long do I have to keep business records?",
        a: "Accounting records, receipts and business correspondence must be kept for ten years. Electronic storage is permitted as long as the data remains unaltered and readable at any time.",
      },
      {
        q: "Can I submit receipts digitally?",
        a: "Yes. You can send us receipts as PDFs or photos. If you prefer paper, we also accept folders.",
      },
      {
        q: "What if I cannot meet a tax deadline?",
        a: "In most cantons the deadline for the tax return can be extended, often online and sometimes for a fee. If we manage your mandate, we take care of this in good time.",
      },
    ],
  },
  contact: {
    title: "Contact",
    intro:
      "Tell us what it is about. We will get back to you with a proposal for a first meeting.",
    pageTitle: "Request a first meeting",
    pageIntro:
      "A few details are enough. The more precisely you describe your situation, the more specific our answer can be.",
    details: "Reach us directly",
    address: "Address",
    phone: "Phone",
    email: "Email",
    hours: "Opening hours",
    form: {
      name: "Name",
      company: "Company",
      optional: "optional",
      email: "Email",
      phone: "Phone",
      clientType: "You are",
      clientTypes: {
        private: "A private individual",
        sole: "Self-employed / sole proprietor",
        company: "A GmbH or AG",
        association: "An association / foundation",
      },
      services: "What is it about?",
      message: "Your message",
      messageHint: "For example: industry, number of employees, what you currently do yourself.",
      consent: "I agree that my details will be stored to process this request.",
      privacyLink: "Privacy policy",
      submit: "Send request",
      sending: "Sending …",
      successTitle: "Request sent",
      successText: "Thank you for your message. We will get back to you as soon as possible.",
      again: "Send another request",
    },
    errors: {
      nameRequired: "Please enter your name.",
      emailInvalid: "Please enter a valid email address, e.g. name@company.ch.",
      phoneInvalid: "Please enter a valid phone number or leave the field empty.",
      clientTypeRequired: "Please choose who you are.",
      servicesRequired: "Please choose at least one topic.",
      messageShort: "Please describe your request in at least 20 characters.",
      messageLong: "The message is too long (max. 4000 characters).",
      consentRequired: "Please confirm your consent.",
      summary: "Please check the highlighted fields.",
      notConfigured:
        "The contact form has not been set up yet. Please contact us directly by email or phone.",
      rateLimited: "You have sent several requests in a short time. Please try again in a few minutes.",
      network: "The request could not be sent. Check your internet connection and try again.",
      server: "The request could not be delivered. Please try again later or contact us directly.",
    },
    pendingDetails: "Address and phone number will appear here once they have been added.",
  },
  footer: {
    tagline: "Fiduciary services for SMEs, the self-employed and private individuals.",
    imprint: "Legal notice",
    privacy: "Privacy",
    top: "Back to top",
  },
  legal: {
    imprintTitle: "Legal notice",
    privacyTitle: "Privacy policy",
    company: "Company",
    responsible: "Responsible for content",
    uid: "UID",
    contact: "Contact",
    disclaimerTitle: "Disclaimer",
    disclaimer:
      "The content of this website is for general information only and does not replace individual advice. Despite careful checking, we accept no liability for accuracy, completeness or timeliness. The operators of linked external sites are solely responsible for their content.",
    privacy: [
      {
        h: "Controller",
        p: "{company} is responsible for processing your personal data on this website. Contact details are listed in the legal notice.",
      },
      {
        h: "Contact form",
        p: "When you write to us using the contact form, we process the details you enter (name, company, email, phone, message and selected topics) solely to answer your request. The details are sent to us by email and are not passed on to third parties, except to the technical provider that delivers the email.",
      },
      {
        h: "Server log files",
        p: "When you visit the website, our hosting provider stores technical information such as IP address, date, time and the page requested. This data is used to operate the website securely and is not combined with other data.",
      },
      {
        h: "Cookies and tracking",
        p: "This website does not use tracking or advertising cookies. Your light or dark appearance setting is stored locally in your browser and is not sent to us.",
      },
      {
        h: "Hosting",
        p: "The website is hosted by Vercel Inc. Data may be transferred to countries outside Switzerland; the provider relies on safeguards recognised by the Federal Data Protection and Information Commissioner.",
      },
      {
        h: "Your rights",
        p: "You may request information about the data we hold about you at any time and ask for it to be corrected or deleted. Please contact the address given in the legal notice.",
      },
    ],
    pending: "Details to follow.",
    updated: "Last updated",
  },
  notFound: {
    title: "This page does not exist",
    text: "It may have moved, or the link contains a typo.",
    home: "Go to home page",
  },
};
