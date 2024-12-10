import '@testing-library/jest-dom';
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import PaginatedTable, { Column } from "@/components/table/PaginatedTable";

const mockData = [
  { id: 1, name: "Alice", active: true },
  { id: 2, name: "Bob", active: false },
  { id: 3, name: "Charlie", active: true },
  { id: 4, name: "Diana", active: false },
  { id: 5, name: "Eve", active: true },
  { id: 6, name: "Frank", active: false },
];

const mockColumns: Column[] = [
  { key: "id", label: "ID" },
  { key: "name", label: "Name" },
  { key: "active", label: "Active" },
];

describe("PaginatedTable", () => {
  it("renders the table with correct headers", () => {
    render(<PaginatedTable data={mockData} columns={mockColumns} />);

    mockColumns.forEach((column) => {
      expect(screen.getByText(column.label)).toBeInTheDocument();
    });
  });

  it("displays the correct number of rows per page", () => {
    const rowsPerPage = 3;
    render(
      <PaginatedTable
        data={mockData}
        columns={mockColumns}
        rowsPerPage={rowsPerPage}
      />
    );

    const rows = screen.getAllByRole("row");
    expect(rows).toHaveLength(rowsPerPage + 1); // +1 for header row
  });

  it("navigates between pages correctly", () => {
    const rowsPerPage = 3;
    render(
      <PaginatedTable
        data={mockData}
        columns={mockColumns}
        rowsPerPage={rowsPerPage}
      />
    );

    // Initially, page 1 should be active
    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.queryByText("Frank")).not.toBeInTheDocument();

    // Navigate to page 2
    fireEvent.click(screen.getByTestId("nav2"));

    expect(screen.getByText("Frank")).toBeInTheDocument();
    expect(screen.queryByText("Alice")).not.toBeInTheDocument();
  });

  it("triggers the onRowClick callback when a row is clicked", () => {
    const handleRowClick = jest.fn();
    render(
      <PaginatedTable
        data={mockData}
        columns={mockColumns}
        onRowClick={handleRowClick}
      />
    );

    const firstRow = screen.getByText("Alice").closest("tr");
    fireEvent.click(firstRow!);

    expect(handleRowClick).toHaveBeenCalledWith(mockData[0]);
  });

  it("displays 'Sí' or 'No' for boolean values in the table", () => {
    render(<PaginatedTable data={mockData} columns={mockColumns} />);

    waitFor(() => {
        expect(screen.queryAllByText("Sí")).toHaveLength(3);
        expect(screen.queryAllByText("No")).toHaveLength(3);
    })
  });
});
