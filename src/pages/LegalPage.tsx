import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { 
  ShieldCheck, 
  FileText, 
  Lock, 
  Scale, 
  Download, 
  Building2, 
  CheckCircle2, 
  ExternalLink,
  HelpCircle,
  Clock,
  Award,
  FileCheck
} from 'lucide-react';
import { PdfViewer } from '../components/PdfViewer';
import { ContactLink } from '../components/ContactLink';
import { fetchDocuments, ComplianceDocument } from '../lib/api';

type LegalDocType = 'tos' | 'privacy' | 'aml';

interface PolicyInfo {
  id: LegalDocType;
  title: string;
  shortTitle: string;
  subtitle: string;
  pdfUrl: string;
  filename: string;
  fileSize: string;
  lastUpdated: string;
  badge: string;
  highlights: string[];
  summaryParagraphs: string[];
  keyClauses: { title: string; desc: string }[];
}

const DEFAULT_POLICIES: Record<LegalDocType, PolicyInfo> = {
  tos: {
    id: 'tos',
    title: 'Terms of Service',
    shortTitle: 'Terms of Service',
    subtitle: 'User agreements, service conditions, and operational terms governing SunnyRemit transactions.',
    pdfUrl: '/SunnyRemit-TOS.pdf',
    filename: 'SunnyRemit-TOS.pdf',
    fileSize: '98 KB',
    lastUpdated: 'August 2026',
    badge: 'Terms & Conditions',
    highlights: [
      'Binding user agreements & account responsibilities',
      'Exchange rate lock-in and remittance execution rules',
      'Transaction limits governed by CBK Money Remittance Regulations',
      'Dispute resolution mechanism and refund procedures'
    ],
    summaryParagraphs: [
      'These Terms of Service govern your access to and use of all foreign exchange currency conversions, branch transfers, M-Pesa payouts, and international money remittance services provided by Sunny Forex & Money Remittance Ltd.',
      'By using SunnyRemit services, you confirm that all funds transferred originate from legitimate sources and that you agree to comply with all identification and regulatory checks mandated under Kenyan law.'
    ],
    keyClauses: [
      {
        title: '1. Regulatory Scope & Authorization',
        desc: 'SunnyRemit operates under strict supervision and licensing from the Central Bank of Kenya (CBK) pursuant to the Money Remittance Regulations, 2013.'
      },
      {
        title: '2. Exchange Rate Locking & Execution',
        desc: 'Exchange rates locked via our online platform or branch system remain valid for the agreed duration, subject to timely settlement and KYC validation.'
      },
      {
        title: '3. Consumer Protection & Liability',
        desc: 'Users must verify recipient details prior to confirming transfers. SunnyRemit is not liable for errors in recipient information provided by the sender.'
      },
      {
        title: '4. Termination & Suspensions',
        desc: 'SunnyRemit reserves the right to withhold, suspend, or cancel any transaction suspected of violating compliance policies or financial regulations.'
      }
    ]
  },
  privacy: {
    id: 'privacy',
    title: 'Privacy Policy',
    shortTitle: 'Privacy Policy',
    subtitle: 'How we collect, protect, process, and respect your personal data and financial records.',
    pdfUrl: '/SunnyRemit-PrivacyPolicy.pdf',
    filename: 'SunnyRemit-PrivacyPolicy.pdf',
    fileSize: '94 KB',
    lastUpdated: 'August 2026',
    badge: 'Data Protection',
    highlights: [
      'Full compliance with the Kenya Data Protection Act, 2019',
      'End-to-end encryption for customer data and identity documents',
      'Zero sale of personal data to third-party marketers',
      'Clear procedures to request data access or deletion'
    ],
    summaryParagraphs: [
      'At SunnyRemit, your privacy and data security are paramount. This policy outlines our transparent data handling practices, detailing what personal information we collect, why we collect it, and how we safeguard your financial identity.',
      'We gather personal identifiers (such as National ID/Passport, KRA PIN, address, and mobile numbers) exclusively for regulatory compliance, customer verification, and seamless payout processing.'
    ],
    keyClauses: [
      {
        title: '1. Information We Collect',
        desc: 'We collect official identification documents, transaction records, contact details, and device metadata required for regulatory compliance and fraud prevention.'
      },
      {
        title: '2. Storage & Security Infrastructure',
        desc: 'All stored customer information is protected with industry-standard AES-256 encryption and accessible only by authorized compliance personnel.'
      },
      {
        title: '3. Information Sharing Restrictions',
        desc: 'We never sell your personal data. We only share information with licensed banking partners, Safaricom M-Pesa, and law enforcement when legally required by court order or CBK directive.'
      },
      {
        title: '4. Data Subject Rights',
        desc: 'You have the right to request a copy of the personal data we hold, correct inaccurate details, or request account data archiving in line with statutory retention laws.'
      }
    ]
  },
  aml: {
    id: 'aml',
    title: 'Anti-Money Laundering (AML) & CTF Policy',
    shortTitle: 'AML & CTF Policy',
    subtitle: 'Our rigorous compliance framework for combating money laundering and terrorist financing.',
    pdfUrl: '/SunnyRemit-AML-policy.pdf',
    filename: 'SunnyRemit-AML-policy.pdf',
    fileSize: '86 KB',
    lastUpdated: 'August 2026',
    badge: 'CBK Compliance',
    highlights: [
      'Proceeds of Crime & Anti-Money Laundering Act (POCAMLA) aligned',
      'Tiered Customer Due Diligence (CDD) and Enhanced Due Diligence (EDD)',
      'Real-time screening against global sanction lists & PEP databases',
      'Mandatory Suspicious Transaction Reporting (STR) to the FRC'
    ],
    summaryParagraphs: [
      'Sunny Forex & Money Remittance Ltd maintains zero tolerance for illicit financial activity. Our Anti-Money Laundering (AML) and Counter-Terrorist Financing (CTF) policy is established under the Proceeds of Crime and Anti-Money Laundering Act (POCAMLA) and CBK guidelines.',
      'Every transaction processed through our branches or online services undergoes strict automated and manual screening to protect the integrity of the financial ecosystem and safeguard our customers.'
    ],
    keyClauses: [
      {
        title: '1. Customer Due Diligence (KYC/CDD)',
        desc: 'All customers must present valid government-issued identification prior to initiating forex or money transfer services, with elevated checks for larger amounts.'
      },
      {
        title: '2. Politically Exposed Persons (PEP)',
        desc: 'Transactions involving PEPs or high-risk jurisdictions require Senior Management sign-off and Enhanced Due Diligence (EDD).'
      },
      {
        title: '3. Suspicious Transaction Reporting',
        desc: 'In compliance with section 44 of POCAMLA, any transaction raising suspicion of money laundering or terrorist funding will be reported to the Financial Reporting Centre (FRC).'
      },
      {
        title: '4. Record Retention Mandate',
        desc: 'Customer identification documents and complete transaction logs are retained securely for a minimum statutory period of seven (7) years.'
      }
    ]
  }
};

export function LegalPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { docId } = useParams<{ docId?: string }>();

  const [activeTab, setActiveTab] = useState<LegalDocType>('tos');
  const [cmsDocuments, setCmsDocuments] = useState<ComplianceDocument[]>([]);

  // Fetch dynamic compliance & KYC documents from CMS API
  useEffect(() => {
    let isMounted = true;
    fetchDocuments()
      .then((docs) => {
        if (isMounted && docs && docs.length > 0) {
          setCmsDocuments(docs);
        }
      })
      .catch((err) => {
        console.warn('Using local policy defaults:', err);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    // Determine active tab from route or query params
    const path = location.pathname.toLowerCase();
    if (path.includes('privacy')) {
      setActiveTab('privacy');
    } else if (path.includes('aml')) {
      setActiveTab('aml');
    } else if (path.includes('terms') || path.includes('tos')) {
      setActiveTab('tos');
    } else if (docId && (docId === 'privacy' || docId === 'aml' || docId === 'tos')) {
      setActiveTab(docId as LegalDocType);
    }
  }, [location.pathname, docId]);

  // Merge CMS dynamic document metadata into active policy if present
  const basePolicy = DEFAULT_POLICIES[activeTab];
  const matchingCmsDoc = cmsDocuments.find((doc) => {
    const slug = doc.slug.toLowerCase();
    if (activeTab === 'tos' && (slug.includes('terms') || slug.includes('tos'))) return true;
    if (activeTab === 'privacy' && slug.includes('privacy')) return true;
    if (activeTab === 'aml' && (slug.includes('aml') || slug.includes('compliance'))) return true;
    return false;
  });

  const currentPolicy: PolicyInfo = {
    ...basePolicy,
    pdfUrl: matchingCmsDoc?.download_url || basePolicy.pdfUrl,
    filename: matchingCmsDoc?.file_name || basePolicy.filename,
    fileSize: matchingCmsDoc?.file_size || basePolicy.fileSize,
  };

  const handleTabChange = (tab: LegalDocType) => {
    setActiveTab(tab);
    if (tab === 'tos') navigate('/terms');
    else if (tab === 'privacy') navigate('/privacy');
    else if (tab === 'aml') navigate('/aml-policy');
  };

  // Helper to get category color badges
  const getCategoryBadgeClass = (category: string) => {
    switch (category) {
      case 'AML & Compliance':
        return 'bg-amber-500/15 text-amber-300 border-amber-500/30';
      case 'KYC & Customer':
        return 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30';
      case 'Legal & Terms':
        return 'bg-sky-500/15 text-sky-300 border-sky-500/30';
      case 'Corporate & Forms':
        return 'bg-purple-500/15 text-purple-300 border-purple-500/30';
      default:
        return 'bg-slate-700/50 text-slate-300 border-slate-600';
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-24 pb-20">
      {/* Header Banner */}
      <section className="bg-slate-900 text-white py-14 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-left">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7A1220]/80 text-white text-xs font-semibold uppercase tracking-wider mb-4 border border-[#9E1B2D]">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>Central Bank of Kenya Regulated</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white font-figtree">
                Legal & Governance Hub
              </h1>
              <p className="mt-3 text-slate-300 text-base sm:text-lg font-light leading-relaxed font-figtree">
                Review, read, and download SunnyRemit's official terms of service, privacy data protections, KYC guidelines, and anti-money laundering policies.
              </p>
            </div>

            {/* CBK Compliance Card */}
            <div className="bg-slate-800/80 border border-slate-700 p-5 rounded-xl flex items-center gap-4 shrink-0 shadow-inner">
              <div className="w-12 h-12 rounded-lg bg-[#006B3F]/20 border border-[#006B3F]/40 flex items-center justify-center text-emerald-400">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-wide font-semibold">Regulatory Status</p>
                <p className="text-sm font-bold text-white font-figtree">Fully CBK Licensed</p>
                <p className="text-xs text-slate-300 font-mono mt-0.5">Cap 491 • Remittance Regs 2013</p>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="mt-10 flex flex-wrap gap-2 sm:gap-3 border-t border-slate-800 pt-6">
            {(Object.keys(DEFAULT_POLICIES) as LegalDocType[]).map((key) => {
              const item = DEFAULT_POLICIES[key];
              const isActive = activeTab === key;
              return (
                <button
                  key={key}
                  onClick={() => handleTabChange(key)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium text-sm transition-all duration-200 ${
                    isActive
                      ? 'bg-[#7A1220] text-white shadow-lg shadow-[#7A1220]/30 font-semibold ring-2 ring-[#B91C1C]'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
                  }`}
                >
                  {key === 'tos' && <Scale className="w-4 h-4" />}
                  {key === 'privacy' && <Lock className="w-4 h-4" />}
                  {key === 'aml' && <ShieldCheck className="w-4 h-4" />}
                  <span>{item.shortTitle}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mt-10">
        {/* Document Header & Overview */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-sm mb-10 text-left">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-gray-150">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="px-3 py-1 bg-rose-50 text-[#7A1220] text-xs font-bold rounded-md uppercase tracking-wider border border-rose-200">
                  {currentPolicy.badge}
                </span>
                <span className="text-xs text-gray-500 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-gray-400" />
                  Effective: {currentPolicy.lastUpdated}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 font-figtree">
                {currentPolicy.title}
              </h2>
              <p className="text-gray-600 mt-1 text-sm sm:text-base font-light">
                {currentPolicy.subtitle}
              </p>
            </div>

            {/* Quick Download Button */}
            <div className="flex items-center gap-3 shrink-0">
              <a
                href={currentPolicy.pdfUrl}
                download={currentPolicy.filename}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#7A1220] hover:bg-[#8F1626] text-white font-semibold text-sm rounded-xl shadow-sm transition-all hover:shadow"
              >
                <Download className="w-4 h-4" />
                <span>Download {currentPolicy.filename}</span>
              </a>
            </div>
          </div>

          {/* Policy Summary Text */}
          <div className="mt-6 space-y-3 text-gray-700 text-sm sm:text-base leading-relaxed">
            {currentPolicy.summaryParagraphs.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          {/* Key Clauses Grid */}
          <div className="mt-8 pt-6 border-t border-gray-150">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 mb-4 font-figtree flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#7A1220]" />
              Essential Policy Provisions
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentPolicy.keyClauses.map((clause, idx) => (
                <div key={idx} className="bg-slate-50 border border-slate-200/80 p-4 rounded-xl">
                  <h4 className="text-sm font-semibold text-gray-900 mb-1 font-figtree">
                    {clause.title}
                  </h4>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {clause.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Interactive PDF Reader Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold text-gray-900 font-figtree flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#7A1220]" />
                Interactive Document Reader
              </h3>
              <p className="text-xs text-gray-500">
                Interact with, zoom, or read the official PDF copy directly below.
              </p>
            </div>
          </div>

          <PdfViewer
            title={currentPolicy.title}
            pdfUrl={currentPolicy.pdfUrl}
            filename={currentPolicy.filename}
            fileSize={currentPolicy.fileSize}
            lastUpdated={currentPolicy.lastUpdated}
            summaryHighlights={currentPolicy.highlights}
          />
        </div>

        {/* All Documents Download Grid (Dynamically Populated from CMS) */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl p-8 text-white text-left shadow-xl border border-slate-800">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 border-b border-slate-800 pb-6">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white font-figtree">
                Complete Compliance & KYC Document Package
              </h3>
              <p className="text-sm text-slate-400 mt-1 font-light">
                Download all official SunnyRemit regulatory disclosures, KYC forms, and compliance documents.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-3 py-1.5 rounded-lg">
              <ShieldCheck className="w-4 h-4" />
              <span>Verified Official Documents</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cmsDocuments.length > 0 ? (
              cmsDocuments.map((doc) => (
                <div 
                  key={doc.id} 
                  className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-5 flex flex-col justify-between hover:border-slate-600 transition-colors shadow-sm"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 rounded-lg bg-[#7A1220]/30 text-rose-400 flex items-center justify-center">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-slate-700 text-slate-300">
                          {doc.file_type || 'PDF'}
                        </span>
                        <span className="text-xs font-mono text-slate-400">{doc.file_size || '—'}</span>
                      </div>
                    </div>

                    <div className="mb-2">
                      <span className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border mb-1.5 ${getCategoryBadgeClass(doc.category)}`}>
                        {doc.category}
                      </span>
                      <h4 className="text-base font-bold text-white font-figtree line-clamp-1">
                        {doc.title}
                      </h4>
                    </div>

                    <p className="text-xs text-slate-400 font-light line-clamp-2">
                      {doc.description || `Official ${doc.category} regulatory document for SunnyRemit customers.`}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-700/60 flex items-center gap-3">
                    <a
                      href={doc.download_url}
                      download={doc.file_name}
                      className="flex-1 py-2 px-3 bg-[#7A1220] hover:bg-[#8F1626] text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download</span>
                    </a>
                    <a
                      href={doc.download_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-lg text-xs transition-colors"
                      title="Open in new tab"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              ))
            ) : (
              (Object.keys(DEFAULT_POLICIES) as LegalDocType[]).map((key) => {
                const doc = DEFAULT_POLICIES[key];
                return (
                  <div key={key} className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-5 flex flex-col justify-between hover:border-slate-600 transition-colors">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-10 h-10 rounded-lg bg-[#7A1220]/30 text-rose-400 flex items-center justify-center">
                          <FileText className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-mono text-slate-400">{doc.fileSize}</span>
                      </div>
                      <h4 className="text-base font-bold text-white font-figtree mb-1">
                        {doc.title}
                      </h4>
                      <p className="text-xs text-slate-400 font-light line-clamp-2">
                        {doc.subtitle}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-700/60 flex items-center gap-3">
                      <a
                        href={doc.pdfUrl}
                        download={doc.filename}
                        className="flex-1 py-2 px-3 bg-[#7A1220] hover:bg-[#8F1626] text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download</span>
                      </a>
                      <a
                        href={doc.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-lg text-xs transition-colors"
                        title="Open in new tab"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Contact Compliance & Legal Assistance */}
        <div className="mt-10 bg-rose-50/80 border border-rose-200/80 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 text-left">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#7A1220] text-white flex items-center justify-center shrink-0">
              <HelpCircle className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold text-gray-900 font-figtree">
                Questions Regarding Compliance or Privacy Rights?
              </h4>
              <p className="text-xs sm:text-sm text-gray-600 mt-1">
                Our Legal & Compliance team is available to address data requests, verification queries, or compliance information.
              </p>
            </div>
          </div>

          <div className="shrink-0 flex items-center gap-3 w-full md:w-auto">
            <ContactLink
              className="w-full md:w-auto px-5 py-2.5 bg-[#7A1220] text-white hover:bg-[#8F1626] text-sm font-semibold rounded-xl text-center shadow-sm transition-colors"
              subject="Legal & Compliance Query"
            >
              Contact Legal Team
            </ContactLink>
          </div>
        </div>
      </section>
    </div>
  );
}
