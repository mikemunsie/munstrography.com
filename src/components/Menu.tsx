import styled from "styled-components";

const StyledMenu = styled.div`
  margin: auto;
  select {
    display: none;
  }
  .category {
    display: none;
  }
  p {
    display: none;
  }
  @media (max-width: 770px) {
    width: calc(100% - 100px);
    .category {
      display: flex;
      align-items: center;
      p {
        display: block;
        padding: 0 !important;
        font-weight: 600;
        margin-right: 15px;
      }
    }
    ul {
      display: none;
    }
    select {
      width: 100%;
      display: block;
      text-transform: capitalize;
      -webkit-appearance: auto;
    }
  }
`;

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
        <a rel="button" onClick={handleClick(item)} className={item === selectedItem ? "active" : ""} data-filter="">
          {item}
        </a>
        <span className="separator">/</span>
      </li>
    );
  });

  return (
    <StyledMenu>
      <div className="category">
        <p>Category:</p>
        <select
          onInput={(e) => {
            onClick((e.target as any).value);
          }}
        >
          {items.map((item) => (
            <option value={item} key={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
      <ul style={{ margin: "auto" }} className="portfolio-main filter full">
        {listItems}
      </ul>
    </StyledMenu>
  );
}
