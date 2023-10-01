interface SectionTitleProps {
  title: string;
  subtitle?: string;
}
const SectionTitle = ({ title, subtitle }: SectionTitleProps) => {
  return (
    <div className="section-title-wrapper">
      <h2 className="section-title">{title}</h2>
      <p className="section-sub-title">{subtitle}</p>
    </div>
  );
};

export default SectionTitle;
