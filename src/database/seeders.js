import userModel from "../models/userModel.js";

export async function taskSeeder(amount = 100, userIds = []){
    
    const categoriesPool = [
        "work",
        "personal",
        "backend",
        "database",
        "urgent",
        "learning",
        "maintenance"
    ]
    
    const descPool = [
        "Implement user authentication flow and handle token expiration correctly",
        "Refactor legacy controller logic to reduce duplicated database queries",
        "Add pagination support to the main listing endpoint",
        "Fix race condition when multiple requests update the same document",
        "Validate incoming request payloads and reject malformed input",
        "Optimize slow aggregation pipeline used in analytics endpoint",
        "Add indexes to frequently queried fields to improve read performance",
        "Handle edge case where referenced document no longer exists",
        "Write migration script to backfill missing fields in old records",
        "Implement soft delete instead of permanently removing documents",
        "Ensure password hashes are never exposed in API responses",
        "Add role-based access control for admin-only routes",
        "Normalize inconsistent field naming across collections",
        "Implement retry logic for transient database failures",
        "Log failed authentication attempts for security auditing",
        "Fix incorrect date parsing when timezone is missing",
        "Add compound index to support combined filter queries",
        "Prevent duplicate records when concurrent inserts occur",
        "Refactor schema to reduce document growth over time",
        "Handle partial failures in multi-step database operations",
        "Add validation rules for required fields at schema level",
        "Implement optimistic locking using version fields",
        "Remove unused fields from documents to reduce payload size",
        "Add API rate limiting to prevent abuse",
        "Fix bug where boolean flags are stored as strings",
        "Ensure consistent error responses across all endpoints",
        "Add audit trail for sensitive data modifications",
        "Implement cascading cleanup when parent document is removed",
        "Refactor aggregation logic into reusable pipeline stages",
        "Handle missing optional fields without breaking consumers",
        "Prevent mass assignment vulnerabilities in update routes",
        "Add automated cleanup job for expired records",
        "Fix query that unintentionally performs full collection scan",
        "Enforce uniqueness constraint at database level",
        "Implement cursor-based pagination instead of offset-based",
        "Improve error handling for invalid ObjectId values",
        "Add validation to prevent empty arrays where not allowed",
        "Ensure createdAt and updatedAt fields stay in sync",
        "Add projection to queries to avoid overfetching data",
        "Fix data inconsistency caused by partial updates",
        "Implement idempotency for write-heavy endpoints",
        "Handle large payload uploads without blocking the event loop",
        "Add text search support for keyword-based queries",
        "Prevent accidental overwrites when updating nested objects",
        "Refactor schema to separate frequently updated fields",
        "Add monitoring for slow queries in production",
        "Ensure deleted users cannot access existing sessions",
        "Handle null vs undefined values consistently",
        "Add validation for array item types",
        "Fix aggregation stage order causing incorrect results"
    ]    

    const randomNum = (multiplier = 1) => Math.floor(Math.random() * multiplier);

    function seedCats(){
        const randomLen = randomNum(4)
        
        let cats = []
        for(let i = 0; i <= randomLen; i++){
            cats = [...cats, categoriesPool[randomNum(categoriesPool.length)]];
        }
        
        return cats;
    }

    const randomDate = (past = true) => (randNum) => {
        const date = new Date();
        
        (past === true) ? date.setDate(date.getDate() - randomNum(randNum)) : date.setDate(date.getDate() + randomNum(randNum));
        
        return date;
    }

    
    const tasks = []

    function seedTask(){
        return {
            title: `Task #${randomNum(1500)}`,
            description: descPool[randomNum(descPool.length)],
            completed: randomNum() < 0.5,
            category: seedCats(),
            dueDate: randomDate(false)(60),
            createdAt: randomDate(true)(50),
            updatedAt: randomDate(true)(30),
            userId: userIds[randomNum(userIds.length)]
        }
    }

    for(let i = 0; i < amount; i++){
        tasks.push(seedTask());
    }

    return tasks;
}