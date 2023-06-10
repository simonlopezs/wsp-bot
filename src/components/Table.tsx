export interface TableProps {
  columns: Column[];
  data: any[];
  actions?: Action[];
}

export interface Column {
  header: string;
  param: string | ((item: any) => string);
  align?: "left" | "center" | "right";
  // format: "text" | "date" | "datetime" | "currency"
}

export interface Action {
  icon: JSX.Element;
  label?: string;
  onClick: (item: any) => void;
}

export const Table = ({ columns, data, actions }: TableProps) => {
  const headers = columns.map(({ header, align }) => ({
    header,
    alignClass: "text-" + (align || "center"),
  }));

  return (
    <div className="bg-white shadow-md rounded my-6">
      <table className="min-w-max w-full table-auto">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            {headers.map(({ header, alignClass }, index) => (
              <th key={index} className={`py-3 px-6 ${alignClass}`}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {data.map((item, index) => (
            <tr
              key={index}
              className="border-b border-gray-200 hover:bg-gray-100"
            >
              {columns.map(({ param }, colIndex) => (
                <td
                  key={colIndex}
                  className={`py-3 px-6 ${headers[colIndex].alignClass}`}
                >
                  <span>
                    {typeof param === "string" ? item[param] : param(item)}
                  </span>
                </td>
              ))}
              {/* 
              <td className="py-3 px-6 text-center">
                <span className="bg-purple-200 text-purple-600 py-1 px-3 rounded-full text-xs">
                  Active
                </span>
              </td> */}

              {actions?.length && (
                <td className="py-3 px-6 text-center">
                  <div className="flex item-center justify-center">
                    {actions.map(({ icon, label, onClick }) => (
                      <div
                        key={label}
                        title={label}
                        onClick={onClick}
                        className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110"
                      >
                        {icon}
                      </div>
                    ))}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
