import { useState } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';

interface JsonTreeProps {
  data: any;
  label?: string;
  isLast?: boolean;
  depth?: number;
}

const JsonTree: React.FC<JsonTreeProps> = ({ data, label, isLast = true, depth = 0 }) => {
  const [isOpen, setIsOpen] = useState(true);

  const isObject = data !== null && typeof data === 'object';
  const isArray = Array.isArray(data);
  const isEmpty = isObject && (isArray ? data.length === 0 : Object.keys(data).length === 0);

  const toggle = () => setIsOpen(!isOpen);

  const renderValue = (val: any) => {
    if (typeof val === 'string') return <span className="text-green-600">"{val}"</span>;
    if (typeof val === 'number') return <span className="text-apple-blue">{val}</span>;
    if (typeof val === 'boolean') return <span className="text-purple-600">{val.toString()}</span>;
    if (val === null) return <span className="text-gray-400">null</span>;
    return null;
  };

  if (!isObject) {
    return (
      <div className="flex items-start py-0.5 font-mono text-sm leading-relaxed">
        {label && <span className="text-apple-text font-semibold mr-2">{label}:</span>}
        {renderValue(data)}
        {!isLast && <span className="text-apple-secondary">,</span>}
      </div>
    );
  }

  const bracketOpen = isArray ? '[' : '{';
  const bracketClose = isArray ? ']' : '}';

  return (
    <div className="font-mono text-sm leading-relaxed">
      <div className="flex items-center cursor-pointer hover:bg-black/5 rounded px-1 -ml-1 py-0.5" onClick={toggle}>
        <span className="w-4 h-4 flex items-center justify-center mr-1 text-apple-secondary">
          {!isEmpty && (isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />)}
        </span>
        {label && <span className="text-apple-text font-semibold mr-2">{label}:</span>}
        <span className="text-apple-secondary">{bracketOpen}</span>
        {!isOpen && !isEmpty && (
          <span className="mx-1 px-1 bg-gray-200 rounded text-xs text-gray-500">
            {isArray ? `${data.length} items` : `${Object.keys(data).length} keys`}
          </span>
        )}
        {!isOpen && <span className="text-apple-secondary">{bracketClose}{!isLast && ','}</span>}
      </div>

      {isOpen && !isEmpty && (
        <div className="ml-6 border-l border-apple-border/50">
          {isArray
            ? data.map((item: any, idx: number) => (
                <JsonTree key={idx} data={item} isLast={idx === data.length - 1} depth={depth + 1} />
              ))
            : Object.entries(data).map(([key, val], idx, arr) => (
                <JsonTree
                  key={key}
                  label={key}
                  data={val}
                  isLast={idx === arr.length - 1}
                  depth={depth + 1}
                />
              ))}
        </div>
      )}

      {isOpen && (
        <div className="flex items-center">
          <span className="w-4 h-4 mr-1" />
          <span className="text-apple-secondary">{bracketClose}{!isLast && ','}</span>
        </div>
      )}
    </div>
  );
};

export default JsonTree;
