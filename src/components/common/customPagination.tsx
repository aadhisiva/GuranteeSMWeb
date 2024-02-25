import { Pagination } from "react-bootstrap";

const CustomPagination = ({ totalPages, currentPage, onPageChange }:any ) => {
    const getPageItems = () => {
      const items = [];
      let totalPagesData = totalPages > 10 ? 10: totalPages
      for (let i = 1; i <= totalPagesData; i++) {
        items.push(
          <Pagination.Item key={i} active={i === currentPage} onClick={() => onPageChange(i)}>
            {i}
          </Pagination.Item>
        );
      }
      return items;
    };
  
    return (
      <div className="flex justify-center items-center -z-1">
      <Pagination>
        <Pagination.First onClick={() => onPageChange(1)} />
        <Pagination.Prev onClick={() => onPageChange(currentPage - 1)} />
        {getPageItems()}
        <Pagination.Next onClick={() => onPageChange(currentPage + 1)} />
        <Pagination.Last onClick={() => onPageChange(totalPages)} />
      </Pagination>
      </div>
    );
  };
  
  export default CustomPagination;