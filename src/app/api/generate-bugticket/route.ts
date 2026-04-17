import { NextRequest, NextResponse } from 'next/server';

interface BugTicketRequest {
  issueDescription: string;
}

interface BugTicket {
  bugTitle: string;
  description: string;
  testSteps: string[];
  actualResult: string;
  expectedResult: string;
}

// Mock AI response - replace with actual AI API call
function generateMockBugTicket(issueDescription: string): BugTicket {
  // Analyze the issue description to generate appropriate bug ticket
  const lowerDescription = issueDescription.toLowerCase();
  
  // Extract key information from the description
  let bugTitle = "Application Issue Detected";
  let description = "";
  let testSteps: string[] = [];
  let actualResult = "";
  let expectedResult = "";

  if (lowerDescription.includes('pre-build') || lowerDescription.includes('explainer')) {
    bugTitle = "Pre-Build Explainer Visibility and Relocation of Icon/Button";
    description = `The current implementation of pre-build explainer has several issues that need to be resolved for improved functionality:

It should remain hidden if there is no active scoreboard available.
If there is a scoreboard present but its status is either draft or not yet converted to a live scoreboard, system should search for other available scoreboards within the same widget to use for the explainer. If no valid scoreboards are found, the explainer should remain hidden.
There is also a need to relocate the pending explainer icon/button to ensure better user experience and accessibility.`;
    
    testSteps = [
      "Access the relevant widget with scoreboards in the dashboard",
      "Verify the visibility of the pre-build explainer under the following conditions:",
      "No active scoreboard is present",
      "A scoreboard is present but its status is draft or not converted, and it should check for alternative scoreboards",
      "Assess the current location of the pending explainer icon/button and evaluate its accessibility in the widget layout"
    ];
    
    actualResult = "The pre-build explainer may remain visible when it should be hidden due to lack of active scoreboards or valid alternatives. The pending explainer icon/button is currently located in a less accessible position for users.";
    expectedResult = "The pre-build explainer should only be visible when there is an active scoreboard available or a valid alternative scoreboard within the widget. The pending explainer icon/button should be relocated for improved visibility and user interaction.";
  } else if (lowerDescription.includes('login') || lowerDescription.includes('auth')) {
    bugTitle = "User Authentication System Malfunction";
    description = "The authentication system is not functioning as expected, preventing users from accessing their accounts or displaying unexpected behavior during the login process.";
    testSteps = [
      "Navigate to the login page",
      "Enter valid credentials",
      "Click the login button",
      "Observe the system response",
      "Check if user is successfully authenticated"
    ];
    actualResult = "Users are unable to login with valid credentials or experience errors during the authentication process.";
    expectedResult = "Users should be able to successfully authenticate and access their accounts with valid credentials.";
  } else if (lowerDescription.includes('button') || lowerDescription.includes('click')) {
    bugTitle = "Button Interaction Not Responding Correctly";
    description = "The button element is not responding to user interactions as expected, causing functionality issues in the user interface.";
    testSteps = [
      "Locate the affected button on the page",
      "Click the button using mouse or touch input",
      "Observe the button's response",
      "Check if the expected action is triggered",
      "Verify if there are any error messages or visual feedback"
    ];
    actualResult = "The button does not trigger the expected action or shows no response when clicked.";
    expectedResult = "The button should respond to user interaction and execute its intended function properly.";
  } else {
    // Generic bug ticket for other issues
    bugTitle = "Application Functionality Issue";
    description = `The application is experiencing unexpected behavior that affects normal operation. Issue reported: ${issueDescription.substring(0, 150)}${issueDescription.length > 150 ? '...' : ''}`;
    testSteps = [
      "Open the application",
      "Navigate to the affected area or feature",
      "Perform the action that triggers the issue",
      "Observe the unexpected behavior",
      "Document the actual outcome and error conditions"
    ];
    actualResult = issueDescription;
    expectedResult = "The application should function normally without errors or unexpected behavior, providing the expected user experience.";
  }

  return {
    bugTitle,
    description,
    testSteps,
    actualResult,
    expectedResult
  };
}

export async function POST(request: NextRequest) {
  try {
    const body: BugTicketRequest = await request.json();
    const { issueDescription } = body;

    if (!issueDescription) {
      return NextResponse.json(
        { error: 'Issue description is required' },
        { status: 400 }
      );
    }

    // For now, using mock data. Replace with actual AI API call
    const bugTicket = generateMockBugTicket(issueDescription);

    // TODO: Replace with actual AI API call
    // const response = await fetch('https://api.openai.com/v1/chat/completions', {
    //   method: 'POST',
    //   headers: {
    //     'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     model: 'gpt-3.5-turbo',
    //     messages: [
    //       {
    //         role: 'system',
    //         content: `You are an expert QA engineer assistant specializing in creating comprehensive, professional bug tickets. Generate a detailed bug ticket based on the provided issue description.
    //         
    //         Follow these guidelines:
    //         1. Create a clear, technical bug title that summarizes the core issue
    //         2. Provide a detailed description that explains the context and impact
    //         3. List specific, actionable test steps that anyone can follow
    //         4. Describe the actual result with specific details about what's failing
    //         5. Define the expected result clearly and concisely
    //         
    //         Return the response in this exact JSON format:
    //         {
    //           "bugTitle": "Clear, technical title of the issue",
    //           "description": "Detailed description explaining the issue context, impact, and business significance",
    //           "testSteps": [
    //             "Specific step 1 with clear action",
    //             "Specific step 2 with clear action",
    //             "Specific step 3 with clear action"
    //           ],
    //           "actualResult": "Detailed description of what is currently happening that is wrong",
    //           "expectedResult": "Clear description of what should happen correctly"
    //         }
    //         
    //         Example for reference:
    //         Input: "Fix pre-build explainer - if no active scoreboard, explainer will stay hidden..."
    //         Output should include: detailed conditions, specific test scenarios, and clear expected vs actual results`
    //       },
    //       {
    //         role: 'user',
    //         content: `Issue Description: ${issueDescription}`
    //       }
    //     ],
    //     temperature: 0.3,
    //   }),
    // });

    return NextResponse.json({ bugTicket });
  } catch (error) {
    console.error('Error generating bug ticket:', error);
    return NextResponse.json(
      { error: 'Failed to generate bug ticket' },
      { status: 500 }
    );
  }
}
