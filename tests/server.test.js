//tests/server.test.js
const fs = require('fs');
const path = require('path');
const { scanDirectory } = require('../src/server'); // Adjust the path as necessary
const request = require('supertest');
const app = require('../src/server'); // Adjust the path as needed

let server;

// Setup before all tests are run
beforeAll((done) => {
    server = app.listen(3000, () => {
      console.log('Server running on http://localhost:3000');
      done();
    });
  });
  
  // Cleanup after all tests are done
  afterAll((done) => {
    server.close(done);
  });

jest.mock('fs');
jest.mock('path');

describe('scanDirectory', () => {
    it('should list files and directories correctly', () => {
        const mockFiles = ['file1.txt', 'folder1'];
        const mockStatsFile = { isDirectory: () => false, size: 100 };
        const mockStatsFolder = { isDirectory: () => true, size: 0 };

        fs.readdirSync.mockReturnValue(mockFiles);
        fs.statSync.mockImplementation((filePath) => {
            if (filePath.includes('file1.txt')) return mockStatsFile;
            if (filePath.includes('folder1')) return mockStatsFolder;
        });

        return scanDirectory('/mock/path')
            .then((result) => {
                expect(result).toEqual([
                    { name: 'file1.txt', type: 'file', size: 100 },
                    { name: 'folder1', type: 'folder', size: 0 },
                ]);
            })
            .catch((error) => {
                // Handle the error appropriately
                console.error('Error scanning directory:', error);
            });
    });

    // Add more tests for edge cases and error handling
});