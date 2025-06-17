import { NextRequest, NextResponse } from 'next/server';
import { MetricsDatabase } from '@/lib/metrics-db';

// Initialize the metrics database
const metricsDb = new MetricsDatabase();

/**
 * GET handler for retrieving performance metrics
 */
export async function GET(request: NextRequest) {
  try {
    // Get query parameters for filtering
    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get('type');
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit') as string, 10) : 100;
    const page = searchParams.get('page') ? parseInt(searchParams.get('page') as string, 10) : 1;
    
    // Get metrics from the database
    const metrics = await metricsDb.getMetrics({ type, limit, page });
    const counts = await metricsDb.getMetricsCounts();
    
    return NextResponse.json({ metrics, counts }, { status: 200 });
  } catch (error) {
    console.error('Error retrieving metrics:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve metrics' },
      { status: 500 }
    );
  }
}

/**
 * POST handler for storing performance metrics
 */
export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const data = await request.json();
    
    // Validate the data
    if (!data || !data.type) {
      return NextResponse.json(
        { error: 'Invalid metrics data. Type is required.' },
        { status: 400 }
      );
    }
    
    // Add metadata to the metrics
    const enhancedData = {
      ...data,
      timestamp: data.timestamp || new Date().toISOString(),
      userAgent: request.headers.get('user-agent') || 'unknown',
      ip: request.headers.get('x-forwarded-for') || request.ip || 'unknown',
      url: data.url || request.headers.get('referer') || 'unknown',
    };
    
    // Store the metrics in the database
    await metricsDb.storeMetrics(enhancedData);
    
    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error('Error storing metrics:', error);
    return NextResponse.json(
      { error: 'Failed to store metrics' },
      { status: 500 }
    );
  }
}

/**
 * DELETE handler for clearing performance metrics
 */
export async function DELETE() {
  try {
    await metricsDb.clearMetrics();
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Error clearing metrics:', error);
    return NextResponse.json(
      { error: 'Failed to clear metrics' },
      { status: 500 }
    );
  }
} 