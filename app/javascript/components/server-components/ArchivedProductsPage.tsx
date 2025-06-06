import React from "react";
import { createCast } from "ts-safe-cast";

import { Membership, Product } from "$app/data/products";
import { register } from "$app/utils/serverComponentUtil";

import { NavigationButton } from "$app/components/Button";
import { Icon } from "$app/components/Icons";
import { PaginationProps } from "$app/components/Pagination";
import { Popover } from "$app/components/Popover";
import { ProductsLayout } from "$app/components/ProductsLayout";
import { WithTooltip } from "$app/components/WithTooltip";

import ProductsPage from "./ProductsPage";

export const ArchivedProductsPage = ({
  memberships,
  memberships_pagination: membershipsPagination,
  products,
  products_pagination: productsPagination,
  can_create_product: canCreateProduct,
}: {
  memberships: Membership[];
  memberships_pagination: PaginationProps;
  products: Product[];
  products_pagination: PaginationProps;
  can_create_product: boolean;
}) => {
  const searchInputRef = React.useRef<HTMLInputElement | null>(null);
  const [isSearchPopoverOpen, setIsSearchPopoverOpen] = React.useState(false);
  const [query, setQuery] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (isSearchPopoverOpen) searchInputRef.current?.focus();
  }, [isSearchPopoverOpen]);

  return (
    <ProductsLayout
      selectedTab="archived"
      title="Products"
      archivedTabVisible
      ctaButton={
        <>
          <Popover
            open={isSearchPopoverOpen}
            onToggle={setIsSearchPopoverOpen}
            aria-label="Toggle Search"
            trigger={
              <WithTooltip tip="Search" position="bottom">
                <div className="button">
                  <Icon name="solid-search" />
                </div>
              </WithTooltip>
            }
          >
            <div className="input">
              <Icon name="solid-search" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search products"
                value={query ?? ""}
                onChange={(evt) => setQuery(evt.target.value)}
              />
            </div>
          </Popover>
          <NavigationButton href={Routes.new_product_path()} disabled={!canCreateProduct} color="accent">
            New product
          </NavigationButton>
        </>
      }
    >
      <section>
        <ProductsPage
          memberships={memberships}
          membershipsPagination={membershipsPagination}
          products={products}
          productsPagination={productsPagination}
          query={query}
          type="archived"
        />
      </section>
    </ProductsLayout>
  );
};

export default register({ component: ArchivedProductsPage, propParser: createCast() });
