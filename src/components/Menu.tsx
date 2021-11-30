type MenuProps = {
  onClick: (val: string) => any;
  items: string[];
  selectedItem: string;
};

export default function Menu(props: MenuProps) {
  const { items, onClick, selectedItem } = props;

  const handleClick = (item: string) => () => {
    onClick(item);
  };

  const listItems = items.map((item) => {
    return (
      <li key={item}>
        <a
          onClick={handleClick(item)}
          className={item === selectedItem ? "active" : ""}
          href="javascript:;"
          data-filter=""
        >
          {item}
        </a>
        <span className="separator">/</span>
      </li>
    );
  });

  return (
    <ul style={{ margin: "auto" }} className="portfolio-main filter full">
      {listItems}
    </ul>
  );
}
