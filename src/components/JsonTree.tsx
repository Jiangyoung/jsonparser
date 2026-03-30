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
    if (typeof val === 'string') return <span className="text-blue-600 break-all whitespace-pre-wrap">"{val}"</span>;
    if (typeof val === 'number') return <span className="text-orange-600 font-medium">{val}</span>;
    if (typeof val === 'boolean') return <span className="text-purple-600 font-medium">{val.toString()}</span>;
    if (val === null) return <span className="text-gray-400">null</span>;
    return null;
  };

  if (!isObject) {
    return (
      <div className="flex items-start py-0.5 font-mono text-sm leading-relaxed">
        {label && <span className="text-gray-900 font-medium mr-2 shrink-0">{label}:</span>}
        {renderValue(data)}
        {!isLast && <span className="text-gray-400">,</span>}
      </div>
    );
  }

  const bracketOpen = isArray ? '[' : '{';
  const bracketClose = isArray ? ']' : '}';

  return (
    <div className="font-mono text-sm leading-relaxed">
      <div className="flex items-center cursor-pointer hover:bg-black/5 rounded px-1 -ml-1 py-0.5 group" onClick={toggle}>
        <span className="w-4 h-4 flex items-center justify-center mr-1 text-gray-300 group-hover:text-gray-600">
          {!isEmpty && (isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />)}
        </span>
        {label && <span className="text-gray-900 font-medium mr-2">{label}:</span>}
        <span className="text-gray-400">{bracketOpen}</span>
        {!isOpen && !isEmpty && (
          <span className="mx-1 px-1 bg-gray-100 rounded text-[10px] text-gray-500">
            {isArray ? `${data.length} items` : `${Object.keys(data).length} keys`}
          </span>
        )}
        {!isOpen && <span className="text-gray-400">{bracketClose}{!isLast && ','}</span>}
      </div>

      {isOpen && !isEmpty && (
        <div className="ml-5 border-l border-gray-100 pl-2">
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
          <span className="text-gray-400">{bracketClose}{!isLast && ','}</span>
        </div>
      )}
    </div>
  );
};

export default JsonTree;
