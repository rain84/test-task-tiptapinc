import style from './style.module.sass'

export const Table = ({ className, caption, rows, columns, onClick }) => {
  if (!Array.isArray(rows) || !Array.isArray(columns)) return null

  return (
    <table className={`${className} ${style.table}`}>
      <thead>
        <tr>
          <td colSpan={columns.length}>{caption}</td>
        </tr>
        <tr>
          {columns.map((column) => (
            <td className={style.text_capitalize} key={column}>
              {column}
            </td>
          ))}
        </tr>
      </thead>
      <tbody onClick={onClick}>
        {rows.map((row) => (
          <tr key={row.id} data-id={row.id}>
            {columns.map((column) => (
              <td key={column}>{row[column]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
