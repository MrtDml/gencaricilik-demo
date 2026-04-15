"use client";

import { useState } from "react";
import { Copy, CheckCheck } from "lucide-react";

interface Props {
  account: {
    id: string;
    bankName: string;
    accountName: string;
    iban: string;
    branch?: string | null;
  };
}

export default function FooterIban({ account }: Props) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(account.iban).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="flex items-start justify-between gap-3 bg-white/3 rounded-xl p-4 border border-white/5">
      <div className="min-w-0">
        <p className="text-white font-semibold text-sm">{account.bankName}</p>
        <p className="text-gray-500 text-xs">{account.accountName}</p>
        {account.branch && <p className="text-gray-600 text-xs">{account.branch} Şubesi</p>}
        <p className="font-mono text-primary text-xs mt-1 break-all">{account.iban}</p>
      </div>
      <button onClick={copy} className="shrink-0 text-gray-500 hover:text-primary transition-colors mt-0.5" title="Kopyala">
        {copied ? <CheckCheck size={14} className="text-green-400" /> : <Copy size={14} />}
      </button>
    </div>
  );
}
