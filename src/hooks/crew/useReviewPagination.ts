import { useMemo } from 'react';

interface UsePaginationProps {
  currentPage: number; // 0-indexed internally
  totalPages: number;
  onPageChange: (page: number) => void;
  isMobile?: boolean; // For responsive behavior
}

interface UsePaginationReturn {
  // State
  currentPage: number; // 0-indexed
  totalPages: number;
  displayedPages: number[]; // Array of page numbers to display

  // Navigation
  canGoPrevious: boolean;
  canGoNext: boolean;
  goToPage: (page: number) => void;
  goToPrevious: () => void;
  goToNext: () => void;

  // Display helpers
  shouldShowStartEllipsis: boolean;
  shouldShowEndEllipsis: boolean;
}

interface DisplayPagesResult {
  pages: number[];
  showStartEllipsis: boolean;
  showEndEllipsis: boolean;
}

/**
 * Helper function to calculate which page numbers to display based on current page
 * and total pages, following the design specifications.
 *
 * @param current - Current page (0-indexed)
 * @param total - Total number of pages
 * @param maxElements - Maximum number of elements including ellipsis (5 for mobile, 7 for tablet+)
 * @returns Object containing page numbers to display and ellipsis flags
 */
function getDisplayedPages(
  current: number,
  total: number,
  maxElements: number
): DisplayPagesResult {
  // Edge case: show all if total pages fit within max elements
  if (total <= maxElements) {
    return {
      pages: Array.from({ length: total }, (_, i) => i),
      showStartEllipsis: false,
      showEndEllipsis: false,
    };
  }

  // Reserve 2 slots for ellipsis (one at start, one at end when needed)
  const maxPageNumbers = maxElements - 2;
  const startThreshold = 2; // Pages 0, 1, 2 are considered "start"
  const endThreshold = total - 3; // Last 3 pages are considered "end"

  // At START: [0] [1] [2] [3] [4] ... [N-1]
  if (current <= startThreshold) {
    const pages = Array.from({ length: maxPageNumbers }, (_, i) => i);
    pages.push(total - 1); // Always include last page
    return {
      pages,
      showStartEllipsis: false,
      showEndEllipsis: true,
    };
  }

  // At END: [0] ... [N-5] [N-4] [N-3] [N-2] [N-1]
  if (current >= endThreshold) {
    const pages = Array.from(
      { length: maxPageNumbers },
      (_, i) => total - maxPageNumbers + i
    );
    pages.unshift(0); // Always include first page
    return {
      pages,
      showStartEllipsis: true,
      showEndEllipsis: false,
    };
  }

  // In MIDDLE: [0] [...] [current-1] [current] [current+1] ... [N-1]
  const pages = [0, current - 1, current, current + 1, total - 1];
  return {
    pages,
    showStartEllipsis: true,
    showEndEllipsis: true,
  };
}

/**
 * Custom hook for pagination logic and state management.
 *
 * @param props - Pagination configuration
 * @returns Pagination state and handlers
 *
 * @example
 * ```typescript
 * const pagination = usePagination({
 *   currentPage: 0,
 *   totalPages: 10,
 *   onPageChange: (page) => setCurrentPage(page),
 *   isMobile: true
 * });
 * ```
 */
export function useReviewPagination({
  currentPage,
  totalPages,
  onPageChange,
  isMobile = false,
}: UsePaginationProps): UsePaginationReturn {
  // Determine max elements based on screen size
  // Mobile: 5 elements (3 page numbers + 2 ellipsis potential)
  // Tablet/Desktop: 7 elements (5 page numbers + 2 ellipsis potential)
  const maxElements = isMobile ? 5 : 7;

  // Calculate displayed pages and ellipsis flags
  const { pages, showStartEllipsis, showEndEllipsis } = useMemo(
    () => getDisplayedPages(currentPage, totalPages, maxElements),
    [currentPage, totalPages, maxElements]
  );

  // Navigation flags
  const canGoPrevious = currentPage > 0;
  const canGoNext = currentPage < totalPages - 1;

  // Navigation handlers
  const goToPage = (page: number) => {
    if (page >= 0 && page < totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  const goToPrevious = () => {
    if (canGoPrevious) {
      onPageChange(currentPage - 1);
    }
  };

  const goToNext = () => {
    if (canGoNext) {
      onPageChange(currentPage + 1);
    }
  };

  return {
    // State
    currentPage,
    totalPages,
    displayedPages: pages,

    // Navigation
    canGoPrevious,
    canGoNext,
    goToPage,
    goToPrevious,
    goToNext,

    // Display helpers
    shouldShowStartEllipsis: showStartEllipsis,
    shouldShowEndEllipsis: showEndEllipsis,
  };
}
