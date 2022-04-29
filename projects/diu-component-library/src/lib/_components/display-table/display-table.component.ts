import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { cTableDataHandler } from "../../_models/table.handler";

/**
 * Display Table Component Class
 */
@Component({
    selector: "display-table",
    templateUrl: "./display-table.component.html",
    styles: [],
})
export class DisplayTableComponent implements OnInit, OnChanges, AfterViewInit {
    /**
     * Table Component Handler Class
     */
    @Input() tableDataHandler: cTableDataHandler;

    /**
     * Output event for actions carried out
     */
    @Output() actionTrigger = new EventEmitter<any>();

    /**
     * Initialisation of Mat Paginator Library component
     */
    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
    /**
     * Initialisation of Mat Sorting Library component
     */
    @ViewChild(MatSort, { static: false }) sort: MatSort;
    /**
     * Initialisation of Mat Table Data Library component
     */
    dataSource: MatTableDataSource<any>;

    /**
     * Dynamic Form Component Constructor
     */
    constructor() {}

    /**
     * Angular Life-cycle hook that is executed when the dynamic form component is initialized
     */
    ngOnInit() {
        this.dataSource = new MatTableDataSource();
        this.setTableData();
    }

    /**
     * Angular Life-cycle hook that is executed when changes are made to the Inputs
     */
    ngOnChanges() {
        this.dataSource = new MatTableDataSource();
        this.setTableData();
        if (this.paginator) {
            this.dataSource.paginator = this.paginator;
        }
        if (this.sort) {
            this.dataSource.sort = this.sort;
        }
    }

    /**
     * Angular Life-cycle hook that is executed after the component is created
     */
    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    /**
     * Function that fills the table based on the Table Handler information
     */
    setTableData() {
        if (this.tableDataHandler && this.tableDataHandler.tableData) {
            this.dataSource.data = this.tableDataHandler.tableData;
        }
    }

    /**
     * Function that runs once a user selects to update, outputs value to parent
     */
    actionSelected(passedFunction, data) {
        this.actionTrigger.emit({ passedFunction, data });
    }

    /**
     * Function to filter the table being viewed based on a string input
     */
    applyFilter(filterValue) {
        filterValue = filterValue.trim();
        filterValue = filterValue.toLowerCase();
        this.dataSource.filter = filterValue;
    }
}
