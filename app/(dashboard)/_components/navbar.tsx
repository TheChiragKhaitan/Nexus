'use client'

import { OrganizationSwitcher, useOrganization, UserButton } from "@clerk/nextjs";
import SearchInput from "./search-input";
import InviteButton from "./invite-button";

const Navbar = () => {

    const { organization } = useOrganization()

    return ( 
        <div className="flex items-center p-5 gap-x-4">
            <div className="hidden lg:flex-1 lg:flex">
                <SearchInput/>
            </div>
            <div className="block lg:hidden flex-1">
                <OrganizationSwitcher 
                    hidePersonal 
                    appearance={
                        {
                            elements: {
                                rootBox: {
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    width: "100%",
                                    maxWidth: "367px",
                                },
                                organizationSwitcherTrigger: {
                                    padding: "6px",
                                    width: "100%",
                                    borderRadius: "8px",
                                    border: "1px solid #E5E7EB",
                                    justifyContent: "space-between",
                                    backgroundColor: "white",
                                },
                            },
                        }}
                />
            </div>
            {/* If there is no Active Organization then don't show this invite button */}
            { organization && (<InviteButton />) }
            <UserButton />            
        </div>
    );
}
 
export default Navbar;