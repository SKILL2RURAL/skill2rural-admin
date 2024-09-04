import Image from "next/image";
import React from "react";

interface MetricsProps {
  metric: Metric;
}

interface Metric {
  title: string;
  icon: any;
  amount: string;
}

const MetricItem: React.FC<MetricsProps> = ({ metric }) => {
  return (
    <div className="border border-[#EAECF0] rounded-[8px] space-y-[30px] p-5 shadow-sm">
      <div className="flex justify-between items-center">
        <h1 className="neue-haas font-[500] text-[16px]">{metric.title}</h1>
        <Image src={metric.icon} alt={metric.title} width={40} />
      </div>
      <p className="sf-pro font-[600] text-[36px]">{metric.amount}</p>
    </div>
  );
};

export default MetricItem;
