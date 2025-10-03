import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Google Sheets API URL for the Partnerships tab
    const sheetId = '1u5QU1aI2pDJgc5koh8cLoHpYPDwLSuwe0uun9uhPcRM'
    const gid = '466045236' // Partnerships tab GID
    const url = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv&gid=${gid}`
    
    const response = await fetch(url)
    
    if (!response.ok) {
      throw new Error('Failed to fetch data from Google Sheets')
    }
    
    const csvText = await response.text()
    
    // Parse CSV data
    const lines = csvText.split('\n').filter(line => line.trim())
    const headers = lines[0].split(',').map(header => header.trim().replace(/"/g, ''))
    
    const partnerships = lines.slice(1).map((line, index) => {
      const values = line.split(',').map(value => value.trim().replace(/"/g, ''))
      
      return {
        id: (index + 1).toString(),
        goals: values[0] || '',
        tasks: values[1] || '',
        team: values[2] || '',
        priority: values[3] || '',
        owner: values[4] || '',
        status: values[5] || '',
        eta: values[6] || '',
        completionDate: values[7] || '',
        links: values[8] || '',
        notes: values[9] || '',
      }
    }).filter(partnership => partnership.goals) // Filter out empty rows
    
    return NextResponse.json(partnerships)
  } catch (error) {
    console.error('Error fetching partnerships data:', error)
    return NextResponse.json(
      { error: 'Failed to fetch partnerships data' },
      { status: 500 }
    )
  }
}
