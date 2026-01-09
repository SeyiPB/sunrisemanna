import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PreviewCardProps {
  title: string;
  excerpt: string;
  date: string;
}

export const PreviewCard = ({ title, excerpt, date }: PreviewCardProps) => {
  return (
    <Card className="bg-white text-black">
      <CardHeader className="pb-3">
        <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">{date}</div>
        <CardTitle className="text-xl font-bold text-gray-900">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 text-sm leading-relaxed">{excerpt}</p>
      </CardContent>
    </Card>
  );
};