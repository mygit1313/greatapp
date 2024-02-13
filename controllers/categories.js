import { excuteQuery } from '@/lib/db';

function errorsResponse(message, errorsData = []) {

    return {
        success: false,
        message: message,
        errors: errorsData
    };
}

function generatePagination(currentPage, totalPages) {
    var showPagination = [];

    if (totalPages <= 10) {
        // If total pages are 10 or less, show all pages
        for (var i = 1; i <= totalPages; i++) {
            showPagination.push(i);
        }
    } else if (currentPage <= 5) {
        // If current page is within the first 5 pages
        for (var i = 1; i <= 10; i++) {
            showPagination.push(i);
        }
    } else if (currentPage >= totalPages - 4) {
        // If current page is within the last 5 pages
        for (var i = totalPages - 9; i <= totalPages; i++) {
            showPagination.push(i);
        }
    } else {
        // If current page is in the middle pages
        for (var i = currentPage - 4; i <= currentPage + 5; i++) {
            showPagination.push(i);
        }
    }

    return showPagination;
}
export const addCategory = async (request) => {
    try {
        const { name, visibility, tag, tag_color,tag_text_color } = request;

        // Check if the email is already registered
        const checkExistance = "SELECT id FROM categories WHERE name = ?";
        const checkExistanceParams = [name];
        const existingData = await excuteQuery(checkExistance, checkExistanceParams);
        var errorsArray = [];
        if (existingData.length > 0) {
            // Email is already registered
            errorsArray.push({
                path: 'name',
                message: "Category already exists."
            });
        }

        if (errorsArray.length > 0) {
            return errorsResponse("Category already exists.", errorsArray);
        }

        const query = "INSERT INTO categories (name, visibility, tag, tag_color, tag_text_color) VALUES (?, ?, ?, ?, ?)";
        const queryParams = [name, visibility, tag, tag_color, tag_text_color];

        const result = await excuteQuery(query, queryParams);
        if (result.insertId) {
            return {
                success: true,
                message: "Record created successfully."
            };
        } else {
            return errorsResponse("An error has occurred. Please try again later, after some time.");
        }

    } catch (error) {
        console.log("Error in creating record:", error);
        return errorsResponse("An error has occurred. Please try again later, after some time.");

        //throw error;
    }
};

export const categoriesListing = async (limit = 10, offset = 0, currentPage = 1, search = '') => {
    try {
        if (search) {
            var checkWords = search;
            const query = "SELECT * FROM categories WHERE `name` LIKE ? LIMIT ? OFFSET ?";
            const queryParams =
                [
                    `%${checkWords}%`,
                    parseInt(limit),
                    parseInt(offset)
                ];
            const result = await excuteQuery(query, queryParams);
            const queryForTotal = "SELECT COUNT(*) AS records_count FROM categories WHERE `name` LIKE ?";
            const resultForTotalRecords = await excuteQuery(queryForTotal,
                [
                    `%${checkWords}%`,
                ]);
            var totalRecords = resultForTotalRecords.length > 0 ? (resultForTotalRecords[0]['records_count']) : 0;
            var totalPages = totalRecords != 0 ? Math.ceil(totalRecords / limit) : 0;
            const showPagination = generatePagination(currentPage, totalPages);

            return {
                success: true,
                data: {
                    result: result,
                    showPagination: showPagination,
                    totalRecords: totalRecords
                }
            };
        } else {
            const query = "SELECT * FROM categories LIMIT ? OFFSET ?";
            const queryParams = [parseInt(limit), parseInt(offset)];
            const result = await excuteQuery(query, queryParams);
            const queryForTotal = "SELECT COUNT(*) AS records_count FROM categories";
            const resultForTotalRecords = await excuteQuery(queryForTotal, []);
            var totalRecords = resultForTotalRecords.length > 0 ? (resultForTotalRecords[0]['records_count']) : 0;
            var totalPages = totalRecords != 0 ? Math.ceil(totalRecords / limit) : 0;
            const showPagination = generatePagination(currentPage, totalPages);

            return {
                success: true,
                data: {
                    result: result,
                    showPagination: showPagination,
                    totalRecords: totalRecords
                }
            };
        }
    }
    catch (error) {
        return { success: false, message: "Access denied" }
    }
};

export const bulkAction = async (actionType, ids) => {
    try {
        const query = "UPDATE categories SET visibility = ? WHERE id IN (?)";
        const queryParams = [actionType, ids];
        const result = await excuteQuery(query, queryParams);
        return {
            success: true,
            message: 'Records updated successfully.'

            //result: result
        };

    } catch (error) {
        console.log("Error logging out user:", error);
        return { success: false, message: "Access denied" }
    }
};

export const updateCategory = async (request) => {
    try {
        const { name, visibility, tag, tag_color, tag_text_color, id } = request;

        // Check if the email is already registered
        const checkExistance = "SELECT id FROM categories WHERE name = ?";
        const checkExistanceParams = [name];
        const existingData = await excuteQuery(checkExistance, checkExistanceParams);
        var errorsArray = [];
        if (existingData.length > 0 && existingData[0].id != id) {
            // Email is already registered
            errorsArray.push({
                path: 'name',
                message: "Category already exists."
            });
        }

        if (errorsArray.length > 0) {
            return errorsResponse("Category already exists.", errorsArray);
        }

        const query = "UPDATE categories SET name = ?, visibility = ?, tag = ?, tag_color = ?, tag_text_color = ? WHERE id = ?";
        const queryParams = [name, visibility, tag, tag_color, tag_text_color, id];

        const result = await excuteQuery(query, queryParams);
        return {
            success: true,
            message: "Record updated successfully."
        };

    } catch (error) {
        console.log("Error in creating record:", error);
        return errorsResponse("An error has occurred. Please try again later, after some time.");

        //throw error;
    }
};

export const updateHeaderMenusOfCategory = async (request) => {
    try {
        const { table_menus, id } = request;

        const query = "UPDATE categories SET table_menus = ? WHERE id = ?";
        const queryParams = [JSON.stringify(table_menus), id];

        const result = await excuteQuery(query, queryParams);
        return {
            success: true,
            message: "Record updated successfully."
        };

    } catch (error) {
        console.log("Error in creating record:", error);
        return errorsResponse("An error has occurred. Please try again later, after some time.");

        //throw error;
    }
};

export const categoriesListingForFrontend = async (timestamp) => {
    try {
        const query = "SELECT * FROM categories WHERE visibility = ?";
        const queryParams = [1];
        const result = await excuteQuery(query, queryParams);
        return {
            success: true,
            data: {
                result: result,
                timestamp
            }
        };
    }
    catch (error) {
        return { success: false, message: "Access denied" }
    }
};